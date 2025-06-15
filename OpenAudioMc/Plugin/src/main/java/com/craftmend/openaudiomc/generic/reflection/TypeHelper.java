package com.craftmend.openaudiomc.generic.reflection;

public class TypeHelper<T>
{
    private Class<T> type;
    public TypeHelper(Class<T> cls)
    {
        type= cls;
    }
    Class<T> getType(){return type;}
}
