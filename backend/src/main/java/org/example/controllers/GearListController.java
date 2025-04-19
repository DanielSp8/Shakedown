package org.example.controllers;

import org.example.daos.GearListDao;
import org.example.models.GearList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/gearlists")
public class GearListController {
    @Autowired
    private GearListDao gearListDao;


    @GetMapping
    public List<GearList> getAll() {
        return gearListDao.getGearLists();
    }

    @GetMapping(path = "/{trail_id}")
    public List<GearList> getGearListByTrailId(@PathVariable int trail_id) {
        return gearListDao.getGearListByTrailId(trail_id);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/batch-insert")
    public List<GearList> createGearList(@RequestBody List<GearList> gearItems) {
        return gearListDao.batchInsertGearListItems(gearItems);
    }
}
