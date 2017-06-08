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
package net.openaudiomc.players;

import com.google.common.collect.Maps;
import java.math.BigInteger;
import java.security.SecureRandom;
import java.util.Map;
import lombok.Getter;

public class Sessions {

  private static final int LENGTH = 32;
  private static SecureRandom random = new SecureRandom();
  @Getter private static Map<String, String> sessions = Maps.newHashMap();

  private static String createSession(String player) {
    BigInteger bigInteger = new BigInteger(25, random);
    String sessionId = String.valueOf(bigInteger.toString(LENGTH));
    getSessions().put(player, sessionId);
    return sessionId;
  }

  public static String getSession(String player) {
    if (getSessions().get(player) != null) {
      return getSessions().get(player);
    } else {
      return createSession(player);
    }
  }
}