package org.example.models;

import java.math.BigDecimal;

public class GearList {
    private int itemId;
    private String itemName;
    private String category;
    private String description;
    private int weightLbs;
    private BigDecimal weightOz;
    private BigDecimal price;
    private Boolean privateValue;
    private int backpackId;


    public GearList() {}

    public GearList(int itemId,
                    String itemName,
                    String category,
                    String description,
                    int weightLbs,
                    BigDecimal weightOz,
                    BigDecimal price,
                    Boolean privateValue,
                    int backpackId) {
        this.itemId = itemId;
        this.itemName = itemName;
        this.category = category;
        this.description = description;
        this.weightLbs = weightLbs;
        this.weightOz = weightOz;
        this.price = price;
        this.privateValue = privateValue;
        this.backpackId = backpackId;
    }

    // Constructor for creating a new gear item in the list
    public GearList(String itemName,
                    String category,
                    String description,
                    int weightLbs,
                    BigDecimal weightOz,
                    BigDecimal price,
                    Boolean privateValue,
                    int backpackId) {
        this.itemName = itemName;
        this.category = category;
        this.description = description;
        this.weightLbs = weightLbs;
        this.weightOz = weightOz;
        this.price = price;
        this.privateValue = privateValue;
        this.backpackId = backpackId;
    }

    public int getItemId() {
        return itemId;
    }

    public void setItemId(int itemId) {
        this.itemId = itemId;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
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

    public int getWeightLbs() {
        return weightLbs;
    }

    public void setWeightLbs(int weightLbs) {
        this.weightLbs = weightLbs;
    }

    public BigDecimal getWeightOz() {
        return weightOz;
    }

    public void setWeightOz(BigDecimal weightOz) {
        this.weightOz = weightOz;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Boolean getPrivateValue() {
        return privateValue;
    }

    public void setPrivateValue(Boolean privateValue) {
        this.privateValue = privateValue;
    }

    public int getBackpackId() {
        return backpackId;
    }

    public void setBackpackId(int backpackId) {
        this.backpackId = backpackId;
    }
}
