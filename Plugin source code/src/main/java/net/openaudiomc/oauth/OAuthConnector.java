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
package net.openaudiomc.oauth;

import net.openaudiomc.socket.Authenticator;
import net.openaudiomc.utils.WebUtils;

import java.io.IOException;

public class OAuthConnector {

    public static String getToken() {
        String serverid = Authenticator.getID();

        try {
            String value = WebUtils.textFromUrl("http://api.openaudiomc.net/oauth/request_key?serverid=" + serverid);
            if (value == null) {
                return "Our auth server reached it's maximum load, please contact us.";
            }
            return value;
        } catch (IOException e) {
            return "Error while requesting key.";
        }
    }
}