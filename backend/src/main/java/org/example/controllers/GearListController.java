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

    @GetMapping(path = "/gear/{trail_id}")
    public List<GearList> getGearListByTrailId(@PathVariable int trail_id) {
        return gearListDao.getGearListByTrailId(trail_id);
    }

    @GetMapping(path="/user")
    public List<GearList> getGearListByUsername(Principal principal) {
        return gearListDao.getGearListByUsername(principal.getName());
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.OK)
    public GearList updateGearItem (@RequestBody GearList gearItem) {
        return gearListDao.updateGearItem(gearItem);
    }

    @PutMapping("/add")
    @ResponseStatus(HttpStatus.CREATED)
    public GearList addGearItem (@RequestBody GearList gearItem) {
        return gearListDao.addGearItem(gearItem);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/batch-insert")
    public List<GearList> createGearList(@RequestBody List<GearList> gearItems) {
        return gearListDao.batchInsertGearListItems(gearItems);
    }

    @DeleteMapping("/{item_id}")
    public int deleteGearItem (@PathVariable int item_id) {
        return gearListDao.deleteGearItem(item_id);
    }


}
