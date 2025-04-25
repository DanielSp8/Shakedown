package org.example.controllers;


import org.example.daos.MainTrailInfoDao;
import org.example.models.MainTrailInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/maintrails")
public class MainTrailInfoController {
    @Autowired
    private MainTrailInfoDao mainTrailInfoDao;

    @GetMapping
    public List<MainTrailInfo> getAllMainTrails() {
        return mainTrailInfoDao.getAllMainTrails();
    }

    @GetMapping("/{username}")
    public List<MainTrailInfo> getMainTrailInfoByUsername(@PathVariable String username) {
        return mainTrailInfoDao.getMainTrailInfoByUsername(username);
    }

    @GetMapping("/{trailId}")
    public List<MainTrailInfo> getMainTrailInfoByTrailId(@PathVariable int trailId) {
        return mainTrailInfoDao.getMainTrailInfoByTrailId(trailId);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public MainTrailInfo createMainTrailInfo(@RequestBody MainTrailInfo mainTrailInfo) {
        return mainTrailInfoDao.createMainTrail(mainTrailInfo);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PutMapping
    public MainTrailInfo updateTrail(@RequestBody MainTrailInfo trailToUpdate) {
        return mainTrailInfoDao.updateMainTrail(trailToUpdate);
    }
}
