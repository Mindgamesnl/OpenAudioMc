package com.craftmend.openaudiomc.generic.commands.selectors;

import com.craftmend.openaudiomc.generic.user.User;

import java.util.ArrayList;
import java.util.List;

public interface SelectorTranslator<T> {

    void setString(String selector);
    void setSender(User<T> sender);
    List<User<T>> getResults();

    default void setSenderGeneric(User unknownSender) {
        this.setSender((User<T>) unknownSender);
    }

    default List<User<?>> getResultsGeneric() {
        // CONVERT TO GENERIC
        List<User<T>> r = getResults();
        List<User<?>> results = new ArrayList<>(r.size());
        for (User<T> user : r) {
            results.add(user);
        }
        return results;
    }

}
