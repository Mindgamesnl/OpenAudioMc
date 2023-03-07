package com.craftmend.openaudiomc.jutils;

import org.mapdb.DBMaker;

public class JUtils {

    public static DBMaker getDbMaker() {
        return DBMaker.INSTANCE;
    }

}
