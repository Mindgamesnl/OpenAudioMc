/*
 * Copyright (C) 2017 Mindgamesnl
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 */
package net.openaudiomc.utils.lang;

import com.google.common.base.Preconditions;
import java.text.MessageFormat;
import java.util.Locale;
import java.util.MissingResourceException;
import java.util.Optional;
import java.util.ResourceBundle;

/*
 * @author Mexicaantjes
 * @since 2.7
 */
public class SimpleMessageProvider {

  private Locale getDefault() {
    return Locale.ENGLISH;
  }

  private final String bundle;

  public SimpleMessageProvider(String bundle) {
    this.bundle = Preconditions.checkNotNull(bundle);
  }

  public Optional<String> get(String key, Locale locale, Object... args) {
    return get(key, locale).map(string -> MessageFormat.format(string, args));
  }

  public Optional<String> get(String key, Object... args) {
    return get(key, getDefault(), args);
  }

  public Optional<String> get(String key) {
    return get(key, getDefault());
  }

  public Optional<String> get(String key, Locale locale) {
    try {
      return Optional.of(getBundle(locale).getString(key));
    } catch (MissingResourceException exception) {
      try {
        return Optional.of(getBundle(getDefault()).getString(key));
      } catch (MissingResourceException ignored) {
        return Optional.empty();
      }
    }
  }

  private ResourceBundle getBundle(Locale locale) {
    return ResourceBundle.getBundle(bundle, locale);
  }
}