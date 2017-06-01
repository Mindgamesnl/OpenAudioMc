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
package net.openaudiomc.syncedsound.objects;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.bukkit.Bukkit;

import net.openaudiomc.core.Main;

public class SyncedSound {
    private String source = "";
    private String lenth = "";
    private String id = "";
    private Long loop = 0L;
    private Integer schedule = 0;
    private Integer timeStamp = 0;
    private Integer sycles = 0;
    private Boolean playing = false;
    private String soundid = "";

    //constructor
    public SyncedSound(String id, String url, String length, String soundid) {
        this.id = id;
        this.soundid = soundid;
        this.source = url;

        try {
            DateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");
            Date reference = dateFormat.parse("00:00:00");
            Date date = dateFormat.parse(length);
            this.loop = (date.getTime() - reference.getTime()) / 1000L;
            this.playing = true;
        } catch (ParseException e) {
        }

        this.schedule = Bukkit.getScheduler().scheduleSyncRepeatingTask(Main.getPL(), new Runnable() {
            @Override
            public void run() {
                sycleTask();
            }
        }, 0, 20);
    }


    //functions
    public void restart() {
        try {
            this.lenth = "";
            this.loop = 0L;
            this.schedule = 0;
            this.timeStamp = 0;
            this.sycles = 0;
            String lstring = this.lenth;
            DateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");
            Date reference = dateFormat.parse("00:00:00");
            Date date = null;

            date = dateFormat.parse(lstring);
            this.loop = (date.getTime() - reference.getTime()) / 1000L;
            this.playing = true;

        } catch (ParseException e) {
            e.printStackTrace();
        }
        this.schedule = Bukkit.getScheduler().scheduleSyncRepeatingTask(Main.getPL(), new Runnable() {
            @Override
            public void run() {
                sycleTask();
            }
        }, 0, 20);
    }

    public void endTask() {
        Bukkit.getScheduler().cancelTask(this.schedule);
        this.playing = false;
    }

    public void sycleTask() {
        if (this.sycles > this.loop) {
            endTask();
        } else {
            this.sycles++;
            this.timeStamp++;
        }
    }

    public String getSoundId() {
        return this.soundid;
    }

    public String getSrc() {
        return this.source;
    }

    public Integer getTime() {
        return this.timeStamp;
    }

    public Integer getTimeInMs() {
        return this.timeStamp * 1000;
    }

    public String getId() {
        return this.id;
    }

    public Boolean isPlaying() {
        return this.playing;
    }
}