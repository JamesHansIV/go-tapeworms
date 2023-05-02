const express = require("express");
const sanitize = require("mongo-sanitize");
const routes = express.Router({mergeParams: true});
const dbo = require("./connect");


// redireect /
routes.route("/").get(async function (req, res) {
    res.redirect("/worms");
});

// redirect home
routes.route("/home").get(async function (req, res) {
    res.redirect("/worms");
});

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


routes.route("/worms/").get(async function(req, res) {
    const connection = dbo.getDb();

    let query = {}
    query["$and"] = [];

    // let order = "lecanicephalidea";
    let collection = process.env.COLLECTION;

    let { 
        scolex,
        apical_organ,
        tentacles,
        hooks,
        scolex_attachment_structures,
        proglottid_margins,
        laciniations,
        pore_position,
        single_column_of_testes,
        post_poral_testes,
        anterior_extent_of_uterus,
        vitelline_follicle_arrangement,
        apolysis,
        wide_anterior_strobia,
        host_group,
        host_family
    } = req.query;
    
    console.log(req.query);

    // build query
    if (scolex != null) {
        sanitize(scolex);
        query["$and"].push({"scolex" : (scolex === 'true')});
    }

    if (apical_organ != null){
        sanitize(apical_organ);
        query["$and"].push({"apical_organ" : (apical_organ === 'true')});
    }
    
    if (tentacles != null) {
        sanitize(tentacles);
        query["$and"].push({"tentacles" : (tentacles === 'true')});
    }

    if (hooks != null) {
        sanitize(hooks);
        query["$and"].push({"hooks" : (hooks === 'true')});
    }

    if (scolex_attachment_structures != null) {
        sanitize(scolex_attachment_structures);
        query["$and"].push({"scolex_attachment_structures" : scolex_attachment_structures});
    }

    if (proglottid_margins != null) {
        sanitize(proglottid_margins);
        query["$and"].push({"proglottid_margins" : proglottid_margins});
    }

    if (laciniations != null) {
        sanitize(laciniations);
        query["$and"].push({"laciniations" : (laciniations === 'true')});
    }

    if (pore_position != null) {
        sanitize(pore_position);
        query["$and"].push({"pore_position" : pore_position});
    }

    if (single_column_of_testes != null) {
        sanitize(single_column_of_testes);
        query["$and"].push({"single_column_of_testes" : (single_column_of_testes === 'true')});
    }

    if (post_poral_testes != null) {
        sanitize(post_poral_testes);
        query["$and"].push({"post_poral_testes" : (post_poral_testes === 'true')});
    }

    if (anterior_extent_of_uterus != null) {
        sanitize(anterior_extent_of_uterus);
        query["$and"].push({"anterior_extent_of_uterus" : anterior_extent_of_uterus});
    }

    if (vitelline_follicle_arrangement != null) {
        sanitize(vitelline_follicle_arrangement);
        query["$and"].push({"vitelline_follicle_arrangement" : vitelline_follicle_arrangement});
    }

    if (apolysis != null) {
        sanitize(apolysis);
        query["$and"].push({ "apolysis" : apolysis });
    }

    if (wide_anterior_strobia != null) {
        sanitize(wide_anterior_strobia);
        query["$and"].push({"wide_anterior_strobia" : (wide_anterior_strobia === 'true')});
    }

    if (host_group != null) {
        sanitize(host_group);
        query["$and"].push({ "host_group" : host_group });
    }

    if (host_family != null) {
        console.log("HOSTFAMILY",host_family)
        sanitize(host_family);
        query["$and"].push({ "host_family" : host_family });
    }

    // if (n_col_testes != null) {
    //     sanitize(n_col_testes);
    //     query["$and"].push({"n_col_testes.min" : { "$lte" : parseInt(n_col_testes) } });
    //     query["$and"].push(
    //         { "$or": [
    //             {"n_col_testes.max" : { "$gte" : parseInt(n_col_testes) } },
    //             {"n_col_testes.max" : null }
    //         ]}
    //     );
    // }

    console.log("built query: ", query);

    // run query
    connection
        .collection(collection)
        .find(query.$and.length == 0 ? {} : query)
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

routes.route("/host_families").get(async function(req, res) {
    const connection = dbo.getDb();
    connection.collection("host_families").find({}, {projection: {host_family: 1, _id: 0}}).toArray(function (err, result) {
        if (err) res.status(400).send("Error fetching from genera table")
        else res.json(result);
    });

})

routes.route('/change').get(async function(req,res){
    const connection = dbo.getDb()
    connection.collection("host_family_names").rename("host_families")
})

module.exports = routes;