package com.craftmend.openaudiomc.generic.utils.data;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;

public class ArrayUtil {

    public static <T> T[] removeNullValues(T[] array) {
        List<T> list = new ArrayList<T>();
        for (T element : array) {
            if (element != null) {
                list.add(element);
            }
        }

        if (list.size() == array.length) {
            return array;
        }

        if (list.size() == 0) {
            return (T[]) Array.newInstance(array.getClass().getComponentType(), 0);
        }

        return list.toArray((T[]) Array.newInstance(array.getClass().getComponentType(), list.size()));
    }


}
