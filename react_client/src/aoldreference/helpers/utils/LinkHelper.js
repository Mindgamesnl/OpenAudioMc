export function StripUrlComponents(input) {
    return input
        .replaceAll("/", "")
        .replaceAll("https", "")
        .replaceAll("http", "")
        .replaceAll(":", "")
}
