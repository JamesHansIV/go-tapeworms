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

routes.route("/worms/:order/:genus").get(async function(req, res) {
    const connection = dbo.getDb();
    const params = req.params;

    console.log(req.params);

    // query db
    connection
        .collection(params.order)
        .find({name: params.genus})
        .toArray(function (err, result) {
            if (err) res.status(400).send(`Error fetching ${params.genus} from ${params.order}`);
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
    let { genus = "lecanicephalidea", _genus, _apolysis, _field, _val} = req.query;

    console.log(req.query)

    if (_genus) { _genus = _genus.toLowerCase(); }
    if (_apolysis && typeof(_apolysis)==String) {_apolysis = _apolysis.toLowerCase();}
    if (_val && typeof(_val)==String) {_val = _val.toLowerCase();}

    console.log(_genus, _apolysis, _val)

    // connection.collection("lecanicephalidea").updateOne(
    //     { name: { $eq: _genus } },
    //     // { $push: { apolysis: _apolysis } },
    //     // { $push: { $proglottids_margins: _proglottids_margins }}
    //     { $push: { proglottids_margins: _val, }}
    // );

    connection.collection("lecanicephalidea").updateMany({},{ $rename: {"Laterally_expanded_immature_proglottids": "laterally_expanded_immature_proglottids"}});

    res.send(`_genus: ${_genus}  <br>  _field: ${_field}  <br>  _val: ${_val}`);

})


module.exports = routes;