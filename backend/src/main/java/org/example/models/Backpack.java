package org.example.models;

import java.util.Date;

public class Backpack {
    private int backpackId;
    private String backpackName;
    private String ownerUsername;
    private String location;
    private Date tripDate;

    public Backpack() {}

    // Constructor for creating a new backpack

    public Backpack(String backpackName, String ownerUsername, String location, Date tripDate) {
        this.backpackName = backpackName;
        this.ownerUsername = ownerUsername;
        this.location = location;
        this.tripDate = tripDate;
    }

    /**
     *
     * Constructor for creating a new backpack, and adding the username as provided
     *  via the one logged in
     */

    public Backpack(String backpackName, String location, Date tripDate) {
        this.backpackName = backpackName;
        this.location = location;
        this.tripDate = tripDate;
    }

    /**
     *
     * Constructor for updating a backpack
     */
    public Backpack(int backpackId, String backpackName, String ownerUsername, String location, Date tripDate) {
        this.backpackId = backpackId;
        this.backpackName = backpackName;
        this.ownerUsername = ownerUsername;
        this.location = location;
        this.tripDate = tripDate;
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

    public Date getTripDate() {
        return tripDate;
    }

    public void setTripDate(Date tripDate) {
        this.tripDate = tripDate;
    }
}
