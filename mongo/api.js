const express = require("express");
const connect = require("./connect");

const routes = express.Router();
const dbo = require("./connect");


routes.route("/test").get(async function() {
    const connection = dbo.getDb();

    connection.connectToServer();
});

routes.route("/worms/lecanicephalidea").get(async function(req, res) {
    const connection = dbo.getDb();

    connection.collection("lecanicephalidea")
        .find({})
        .toArray(function (err, result) {
            if (err) {
                res.status(400).send("Error fetching lecanicephalidea!");
            } else {
                res.json(result);
            }
        });
});

routes.route("/worms/:genus/:species").get(async function(req, res) {
    const connection = dbo.getDb();
    const params = req.params;

    console.log(req.params);

    // query db
    connection
        .collection(params.genus)
        .find({name: params.species})
        .toArray(function (err, result) {
            if (err) res.status(400).send(`Error fetching ${params.species} from ${params.genus}`);
            else res.json(result);
        });
})

routes.route("/worms/").get(async function(req, res) {
    const connection = dbo.getDb();

    
    console.log(req.query);

    let { genus = "lecanicephalidea", _species, _apolysis, _apical_organ } = req.query;
    
    console.log(_apolysis);

    // connection
    //     .collection(genus)
    //     .find({
    //         name: _species,
    //         apolysis: _apolysis 
    //     })

    // const connection = dbo.getDb();
    // const params = req.params;

    // console.log(req.params);

    // // query db
    // connection
    //     .collection(params.genus)
    //     .find({name: params.species})
    //     .toArray(function (err, result) {
    //         if (err) res.status(400).send(`Error fetching ${params.species} from ${params.genus}`);
    //         else res.json(result);
    //     });
})

routes.route("/close").get(async function() {
    dbo.disconnectFromServer();
});

// routes.route("/lower").get( async function(req, res) {
//     const connection = dbo.getDb();
//     connection.collection("lecanicephalidea").updateMany({},[{$set:{name: {$toLower: "$name"}}}])
// })

routes.route("/update/").get( async function(req, res) {
    const connection = dbo.getDb();
    let { genus = "lecanicephalidea", _species,val} = req.query;

    console.log(req.query, _species, val)
    // connection.collection("lecanicephalidea").updateMany({},[{$set:{name: {$toLower: "$name"}}}]);

    // connection
    //     .collection("lecanicephalidea")
    //     .updateMany(
    //         {},
    //         [   
    //             { $set : { "host" : {
    //                 $switch : {
    //                     branches : [
    //                         { case: { $eq: ["$batoid_shark", "shark"]}, then: ["shark"]},
    //                         { case: { $eq: ["$batoid_shark", "batoid"]}, then: ["batoid"]},
    //                         { case: { $eq: ["$batoid_shark", "batoid/shark"]}, then: ["shark","batoid"]}
    //                     ]
    //                 }
    //             }}
    //             }, { $unset: "batoid_shark"}
                
    //         ]
    // );

    connection.collection("lecanicephalidea").updateOne(
        { name: { $eq: _species } },
        { $push: { _apolysis: val } }
        // [ 
        //     { $set : { "apolysis" : {
        //         $switch : {
        //             branches : [
        //                 { case: { $eq: ["$apolysis", "euapolytic"]}, then: ["euapolytic"]},
        //                 { case: { $eq: ["$apolysis", "apolytic"]}, then: ["apolytic"]},
        //                 { case: { $eq: ["$apolysis", "hyperapolytic/euapolytic"]}, then: ["euapolytic","hyperapolytic"]},
        //                 { case: { $eq: ["$apolysis", "euapolytic/apolytic"]}, then: ["shark","batoid","apolytic"]}
        //             ], 
        //             default: "No Match"
        //         }
        //     }}}
        // ]
    );

    res.send("success");

})


module.exports = routes;