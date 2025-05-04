package org.example.models;

public class Backpack {
    private int backpackId;
    private String backpackName;
    private String ownerUsername;
    private String location;
    private Boolean privateValue;

    public Backpack() {}

    // Constructor for creating a new backpack

    public Backpack(String backpackName, String ownerUsername, String location, Boolean privateValue) {
        this.backpackName = backpackName;
        this.ownerUsername = ownerUsername;
        this.location = location;
        this.privateValue = privateValue;
    }

    /**
     *
     * Constructor for creating a new backpack, and adding the username as provided
     *  via the one logged in
     */

    public Backpack(String backpackName, String location, Boolean privateValue) {
        this.backpackName = backpackName;
        this.location = location;
        this.privateValue = privateValue;
    }

    /**
     *
     * Constructor for updating a backpack
     */
    public Backpack(int backpackId, String backpackName, String ownerUsername, String location, Boolean privateValue) {
        this.backpackId = backpackId;
        this.backpackName = backpackName;
        this.ownerUsername = ownerUsername;
        this.location = location;
        this.privateValue = privateValue;
    }



    public int getBackpackId() {
        return backpackId;
    }

    public void setBackpackId(int backpackId) {
        this.backpackId = backpackId;
    }

    public String getBackpackName() {
        return backpackName;
    }

    public void setBackpackName(String backpackName) {
        this.backpackName = backpackName;
    }

    public String getOwnerUsername() {
        return ownerUsername;
    }

    public void setOwnerUsername(String ownerUsername) {
        this.ownerUsername = ownerUsername;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Boolean getPrivateValue() {
        return privateValue;
    }

    public void setTripDate(Boolean privateValue) {
        this.privateValue = privateValue;
    }
}
