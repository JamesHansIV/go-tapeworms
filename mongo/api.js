const express = require("express");
const sanitize = require("mongo-sanitize");

const routes = express.Router();
const dbo = require("./connect");

// get data by order
routes.route("/worms/:order").get(async function(req, res) {
    const connection = dbo.getDb();
    const params = req.params;

    connection.collection(params.order)
        .find({})
        .toArray(function (err, result) {
            if (err) {
                res.status(400).send(`Error fetching ${params.order}!`);
            } else {
                res.json(result);
            }
        });
});

// get data by order and genus
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

routes.route("/worms/filter").get(async function(req, res) {
    const connection = dbo.getDb();

    let query = {}
    query["$and"] = [];

    let { order = "lecanicephalidea", 
        apical_organ, 
        tentacles,
        proglottids_laciniations,
        n_col_testes,
        acetabula_shape,
        host,
        apolysis,
        proglottids_margins,
        laterally_expanded_immature_proglottids } = req.query;
    
    console.log(req.query);

    // build query
    if (apical_organ != null)
        query["$and"].push({"apical_organ" : (apical_organ === 'true')});
    
    if (tentacles != null)
        query["$and"].push({"tentacles" : (tentacles === 'true')});

    if (proglottids_laciniations != null)
        query["$and"].push({"proglottids_laciniations" : (proglottids_laciniations === 'true')});

    if (n_col_testes != null) {
        query["$and"].push({"n_col_testes.min" : { "$lte" : parseInt(n_col_testes) } });
        query["$and"].push(
            { "$or": [
                {"n_col_testes.max" : { "$gte" : parseInt(n_col_testes) } },
                {"n_col_testes.max" : null }
            ]}
        );
    }

    if (acetabula_shape != null)
        query["$and"].push({"acetabula_shape" : acetabula_shape })

    // query hosts
    if (host != null)
        query["$and"].push({ "host" : host });

    // query apolysis
    if (apolysis != null)
        query["$and"].push({ "apolysis" : apolysis });

    // query proglottids_margins
    if (proglottids_margins != null)
        query["$and"].push({ "proglottids_margins" : proglottids_margins });

    // query laterally_expanded_immature_proglottids
    if (laterally_expanded_immature_proglottids != null)
        query["$and"].push({ "laterally_expanded_immature_proglottids" : (laterally_expanded_immature_proglottids === "true") });


    console.log(query);

    

    // TO DO
    // sanitize inputs


    // run query
    connection
        .collection(order)
        .find(query)
        .toArray ( function (err, result) {
            if (err) throw err;
            else res.json(result);
        });
});

routes.route("/update/").get( async function(req, res) {
    const connection = dbo.getDb();
    let { genus = "lecanicephalidea", _genus, _apolysis, _field, _val} = req.query;

    console.log(req.query)

    if (_genus) { _genus = _genus.toLowerCase(); }
    if (_apolysis && typeof(_apolysis)==String) {_apolysis = _apolysis.toLowerCase();}
    if (_val && typeof(_val)==String) {_val = _val.toLowerCase();}

    console.log(_genus, _apolysis, _val)

    connection.collection("lecanicephalidea").updateMany({},{ $rename: {"Laterally_expanded_immature_proglottids": "laterally_expanded_immature_proglottids"}});

    res.send(`_genus: ${_genus}  <br>  _field: ${_field}  <br>  _val: ${_val}`);

})


module.exports = routes;