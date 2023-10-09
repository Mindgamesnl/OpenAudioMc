package com.craftmend.openaudiomc.generic.utils;

import java.lang.reflect.Proxy;
import java.util.HashMap;
import java.util.Map;

public class ClassMocker<T> {

    private Map<String, Object> returnTypes = new HashMap<>();
    private Class<T> mockedClass;

    public ClassMocker(Class<T> mockedClass) {
        this.mockedClass = mockedClass;
    }

    public ClassMocker<T> addReturnValue(String methodName, Object returnValue) {
        returnTypes.put(methodName, returnValue);
        return this;
    }

    // create proxy
    public T createProxy() {
        return mockedClass.cast(Proxy.newProxyInstance(
                mockedClass.getClassLoader(),
                new Class[]{mockedClass},
                (proxy, method, args) -> {
                    if (returnTypes.containsKey(method.getName())) {
                        return returnTypes.get(method.getName());
                    }
                    return null;
                }
        ));
    }

}
