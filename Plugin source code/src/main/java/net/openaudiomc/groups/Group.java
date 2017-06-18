package net.openaudiomc.groups;

import com.google.common.base.Preconditions;
import com.google.common.collect.Lists;
import java.util.List;
import java.util.UUID;
import lombok.Getter;

public class Group {

  @Getter private List<UUID> members = Lists.newArrayList();
  @Getter private String name = null;

  public Group(String name) {
    Preconditions.checkNotNull(name, "Group name is null");
    this.name = name;
  }

  public void addMember(UUID uuid) {
    if (getMembers().contains(uuid)) return;
    getMembers().add(uuid);
  }

  public void removeMember(UUID uuid) {
    if (!getMembers().contains(uuid)) return;
    getMembers().remove(uuid);
  }
}
