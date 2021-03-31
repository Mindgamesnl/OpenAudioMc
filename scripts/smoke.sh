#!/bin/bash
SMOKE_TMP_DIR=$(mktemp -d)

SMOKE_AFTER_RESPONSE=""

SMOKE_CURL_CODE="$SMOKE_TMP_DIR/smoke_curl_code"
SMOKE_CURL_HEADERS="$SMOKE_TMP_DIR/smoke_curl_headers"
SMOKE_CURL_BODY="$SMOKE_TMP_DIR/smoke_curl_body"
SMOKE_CURL_COOKIE_JAR="$SMOKE_TMP_DIR/smoke_curl_cookie_jar"

SMOKE_CSRF_TOKEN=""
SMOKE_CSRF_FORM_DATA="$SMOKE_TMP_DIR/smoke_csrf_form_data"

SMOKE_TESTS_FAILED=0
SMOKE_TESTS_RUN=0
SMOKE_URL_PREFIX=""
SMOKE_HEADER_HOST=""

## "Public API"

smoke_csrf() {
    SMOKE_CSRF_TOKEN="$1"
}

smoke_form() {
    URL="$1"
    FORMDATA="$2"

    if [[ ! -f "$FORMDATA" ]]; then
        _smoke_print_failure "No formdata file"
        _smoke_cleanup
        exit 1
    fi

    _curl_post $URL $FORMDATA
}

smoke_form_ok() {
    URL="$1"
    FORMDATA="$2"

    smoke_form "$URL" "$FORMDATA"
    smoke_assert_code_ok
}

smoke_report() {
    _smoke_cleanup
    if [[ $SMOKE_TESTS_FAILED -ne 0 ]]; then
        _smoke_print_report_failure "FAIL ($SMOKE_TESTS_FAILED/$SMOKE_TESTS_RUN)"
        exit 1
    fi
    _smoke_print_report_success "OK ($SMOKE_TESTS_RUN/$SMOKE_TESTS_RUN)"
}

smoke_response_code() {
    cat $SMOKE_CURL_CODE
}

smoke_response_body() {
    cat $SMOKE_CURL_BODY
}

smoke_response_headers() {
    cat $SMOKE_CURL_HEADERS
}

smoke_tcp_ok() {
    URL="$1 $2"
    _smoke_print_url "$URL"
    echo EOF | telnet $URL > $SMOKE_CURL_BODY
    smoke_assert_body "Connected"
}

smoke_url() {
    URL="$1"
    _curl_get $URL
}

smoke_url_ok() {
    URL="$1"
    smoke_url "$URL"
    smoke_assert_code_ok
}

smoke_url_prefix() {
    SMOKE_URL_PREFIX="$1"
}

smoke_host() {
    SMOKE_HEADER_HOST="$1"
}

## Assertions

smoke_assert_code() {
    EXPECTED="$1"
    CODE=$(cat $SMOKE_CURL_CODE)

    if [[ $CODE == $1 ]]; then
        _smoke_success "$1 Response code"
    else
        _smoke_fail "$1 Response code"
    fi
}

smoke_assert_code_ok() {
    CODE=$(cat $SMOKE_CURL_CODE)

    if [[ $CODE == 2* ]]; then
        _smoke_success "2xx Response code"
    else
        _smoke_fail "2xx Response code"
    fi
}

smoke_assert_body() {
    STRING="$1"

    smoke_response_body | grep --quiet "$STRING"

    if [[ $? -eq 0 ]]; then
        _smoke_success "Body contains \"$STRING\""
    else
        _smoke_fail "Body does not contain \"$STRING\""
    fi
}

smoke_assert_headers() {
    STRING="$1"

    smoke_response_headers | grep --quiet "$STRING"

    if [[ $? -eq 0 ]]; then
        _smoke_success "Headers contain \"$STRING\""
    else
        _smoke_fail "Headers do not contain \"$STRING\""
    fi
}

## Smoke "private" functions

_smoke_after_response() {
    $SMOKE_AFTER_RESPONSE
}

_smoke_cleanup() {
    rm -rf $SMOKE_TMP_DIR
}

_smoke_fail() {
    REASON="$1"
    (( ++SMOKE_TESTS_FAILED ))
    (( ++SMOKE_TESTS_RUN ))
    _smoke_print_failure "$REASON"
}

_smoke_prepare_formdata() {
    FORMDATA="$1"

    if [[ "" != $SMOKE_CSRF_TOKEN ]]; then
        cat $FORMDATA | sed "s/__SMOKE_CSRF_TOKEN__/$SMOKE_CSRF_TOKEN/" > $SMOKE_CSRF_FORM_DATA
        echo $SMOKE_CSRF_FORM_DATA
    else
        echo $FORMDATA
    fi
}

_smoke_success() {
    REASON="$1"
    _smoke_print_success "$REASON"
    (( ++SMOKE_TESTS_RUN ))
}

## Curl helpers
_curl() {
  local opt=(--cookie $SMOKE_CURL_COOKIE_JAR --cookie-jar $SMOKE_CURL_COOKIE_JAR --location --dump-header $SMOKE_CURL_HEADERS --silent)
  if [[ -n "$SMOKE_HEADER_HOST" ]]
  then
    opt+=(-H "Host: $SMOKE_HEADER_HOST")
  fi
  curl "${opt[@]}" "$@" > $SMOKE_CURL_BODY
}

_curl_get() {
    URL="$1"

    SMOKE_URL="$SMOKE_URL_PREFIX$URL"
    _smoke_print_url "$SMOKE_URL"

    _curl $SMOKE_URL

    grep -oE 'HTTP[^ ]+ [0-9]{3}' $SMOKE_CURL_HEADERS | tail -n1 | grep -oE '[0-9]{3}' > $SMOKE_CURL_CODE

    $SMOKE_AFTER_RESPONSE
}

_curl_post() {
    URL="$1"
    FORMDATA="$2"
    FORMDATA_FILE="@"$(_smoke_prepare_formdata $FORMDATA)

    SMOKE_URL="$SMOKE_URL_PREFIX$URL"
    _smoke_print_url "$SMOKE_URL"

    _curl --data "$FORMDATA_FILE" $SMOKE_URL

    grep -oE 'HTTP[^ ]+ [0-9]{3}' $SMOKE_CURL_HEADERS | tail -n1 | grep -oE '[0-9]{3}' > $SMOKE_CURL_CODE

    $SMOKE_AFTER_RESPONSE
}

## Print helpers

# test for color support, inspired by:
# http://unix.stackexchange.com/questions/9957/how-to-check-if-bash-can-print-colors
if [ -t 1 ]; then
    ncolors=$(tput colors)
    if test -n "$ncolors" && test $ncolors -ge 8; then
        bold="$(tput bold)"
        normal="$(tput sgr0)"
        red="$(tput setaf 1)"
        redbg="$(tput setab 1)"
        green="$(tput setaf 2)"
        greenbg="$(tput setab 2)"
    fi
fi

_smoke_print_failure() {
    TEXT="$1"
    echo "    [${red}${bold}FAIL${normal}] $TEXT"
}

_smoke_print_report_failure() {
    TEXT="$1"
    echo -e "${redbg}$TEXT${normal}"
}
_smoke_print_report_success() {
    TEXT="$1"
    echo -e "${greenbg}$TEXT${normal}"
}

_smoke_print_success() {
    TEXT="$1"
    echo "    [ ${green}${bold}OK${normal} ] $TEXT"
}

_smoke_print_url() {
    TEXT="$1"
    echo "> $TEXT"
}
