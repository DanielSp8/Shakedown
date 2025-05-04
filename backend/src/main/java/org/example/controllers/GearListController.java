package org.example.controllers;

import org.example.daos.GearListDao;
import org.example.models.GearList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/gearlists")
@PreAuthorize("isAuthenticated()")
public class GearListController {
    @Autowired
    private GearListDao gearListDao;

    @GetMapping
    public List<GearList> getAll() {
        return gearListDao.getGearLists();
    }


    @GetMapping("/gear/{backpackId}")
    public List<GearList> getGearListByBackpackId(@PathVariable int backpackId) {
        return gearListDao.getGearListByBackpackId(backpackId);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.OK)
    public GearList updateGearItem (@RequestBody GearList gearItem) {
        return gearListDao.updateGearItem(gearItem);
    }

    @PostMapping("/add")
    @ResponseStatus(HttpStatus.CREATED)
    public GearList createGearItem (@RequestBody GearList gearItem) {
        return gearListDao.addGearItem(gearItem);
    }

    @DeleteMapping("/{itemId}")
    public int deleteGearItem (@PathVariable int itemId) {
        return gearListDao.deleteGearItem(itemId);
    }
}
