package org.example.models;

import java.math.BigDecimal;

public class GearList {
    private int item_id;
    private String item_name;
    private String category;
    private String description;
    private int weight_lbs;
    private BigDecimal weight_oz;
    private BigDecimal price;
    private int trail_id;

    public GearList() {}

    public GearList(int item_id,
                    String item_name,
                    String category,
                    String description,
                    int weight_lbs,
                    BigDecimal weight_oz,
                    BigDecimal price,
                    int trail_id) {
        this.item_id = item_id;
        this.item_name = item_name;
        this.category = category;
        this.description = description;
        this.weight_lbs = weight_lbs;
        this.weight_oz = weight_oz;
        this.price = price;
        this.trail_id = trail_id;
    }

    // Constructor for creating a new gear item in the list
    public GearList(String item_name,
                    String category,
                    String description,
                    int weight_lbs,
                    BigDecimal weight_oz,
                    BigDecimal price,
                    int trail_id) {
        this.item_name = item_name;
        this.category = category;
        this.description = description;
        this.weight_lbs = weight_lbs;
        this.weight_oz = weight_oz;
        this.price = price;
        this.trail_id = trail_id;
    }

    public int getItem_id() {
        return item_id;
    }

    public void setItem_id(int item_id) {
        this.item_id = item_id;
    }

    public String getItem_name() {
        return item_name;
    }

    public void setItem_name(String item_name) {
        this.item_name = item_name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getWeight_lbs() {
        return weight_lbs;
    }

    public void setWeight_lbs(int weight_lbs) {
        this.weight_lbs = weight_lbs;
    }

    public BigDecimal getWeight_oz() {
        return weight_oz;
    }

    public void setWeight_oz(BigDecimal weight_oz) {
        this.weight_oz = weight_oz;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public int getTrail_id() {
        return trail_id;
    }

    public void setTrail_id(int trail_id) {
        this.trail_id = trail_id;
    }
}
