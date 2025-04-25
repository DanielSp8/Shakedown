package org.example.models;

import java.math.BigDecimal;

public class MainTrailInfo {
    private int trail_id;
    private String trail_name;
    private String description;
    private String location;
    private String difficulty;
    private BigDecimal total_miles;
    private Boolean food_pickups;
    private String username;

    public MainTrailInfo() {}

    public MainTrailInfo(String trail_name, String description,String location, String difficulty, BigDecimal total_miles, Boolean food_pickups, String username) {
        this.trail_name = trail_name;
        this.description = description;
        this.location = location;
        this.difficulty = difficulty;
        this.total_miles = total_miles;
        this.food_pickups = food_pickups;
        this.username = username;
    };

    public MainTrailInfo(int trail_id, String trail_name, String description, String location, String difficulty, BigDecimal total_miles, Boolean food_pickups, String username) {
        this.trail_id = trail_id;
        this.trail_name = trail_name;
        this.description = description;
        this.location = location;
        this.difficulty = difficulty;
        this.total_miles = total_miles;
        this.food_pickups = food_pickups;
        this.username = username;
    }

    public int getTrail_id() {
        return trail_id;
    }

    public void setTrail_id(int trail_id) {
        this.trail_id = trail_id;
    }

    public String getTrail_name() {
        return trail_name;
    }

    public void setTrail_name(String trail_name) {
        this.trail_name = trail_name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }

    public BigDecimal getTotal_miles() {
        return total_miles;
    }

    public void setTotal_miles(BigDecimal total_miles) {
        this.total_miles = total_miles;
    }

    public Boolean getFood_pickups() {
        return food_pickups;
    }

    public void setFood_pickups(Boolean food_pickups) {
        this.food_pickups = food_pickups;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
