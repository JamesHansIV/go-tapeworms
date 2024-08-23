
const express = require("express");
const sanitize = require("mongo-sanitize");
const routes = express.Router({ mergeParams: true });
const dbo = require("./connect");

const https = require('https');
const { features } = require("process");

// wakeup
setInterval(() => {
    // console.log("Pinging API")
    https.get("https://api.tapeworms-unlocked.info");

}, 13 * 60 * 1000);

// redireect /
routes.route("/").get(async function (req, res) {
    res.redirect("/worms");
});

routes.route("/colors").get(async function(req, res) {
    const connection = dbo.getDb();
    
    connection
    .collection("order_colors")
    .find({})
    .toArray(function (err, result) {
        if (err) throw err;
        else res.json(result);
    });
});

routes.route('/worms/').get(async function (req, res) {
    const connection = dbo.getDb();
    
    let query = {}
    query['$and'] = [];

    let collection = dbo.getCollection();
    console.log(collection)

    let {
        scolex,
        apical_organ,
        tentacles,
        hooks,
        scolex_attachment_structures,
        proglottid_margins,
        laciniations,
        genital_pore_position,
        single_column_of_testes,
        post_poral_testes,
        anterior_extent_of_uterus,
        vitelline_follicle_arrangement,
        apolysis,
        host_group,
        host_family,
        bothridial_features,
        apical_bothridial_region,
        hook_placement,
        hook_features,

        count_by_order
    } = req.query;

    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    if (scolex != null) {
        sanitize(scolex);
        query["$and"].push({ "scolex": scolex });
    }

    if (apical_organ != null) {
        sanitize(apical_organ);
        query["$and"].push({ "apical_organ": apical_organ });
    }

    if (tentacles != null) {
        sanitize(tentacles);
        query["$and"].push({ "tentacles": tentacles });
    }

    if (hooks != null) {
        sanitize(hooks);
        query["$and"].push({ "hooks": hooks });
    }

    if (scolex_attachment_structures != null) {
        sanitize(scolex_attachment_structures);
        query["$and"].push({ "scolex_attachment_structures": scolex_attachment_structures });
    }

    if (proglottid_margins != null) {
        sanitize(proglottid_margins);
        query["$and"].push({ "proglottid_margins": proglottid_margins });
    }

    if (laciniations != null) {
        sanitize(laciniations);
        query["$and"].push({ "laciniations": laciniations });
    }

    if (genital_pore_position != null) {
        sanitize(genital_pore_position);
        query["$and"].push({ "genital_pore_position": genital_pore_position });
    }

    if (single_column_of_testes != null) {
        sanitize(single_column_of_testes);
        query["$and"].push({ "single_column_of_testes": single_column_of_testes });
    }

    if (post_poral_testes != null) {
        sanitize(post_poral_testes);
        query["$and"].push({ "post_poral_testes": post_poral_testes });
    }

    if (anterior_extent_of_uterus != null) {
        sanitize(anterior_extent_of_uterus);
        query["$and"].push({ "anterior_extent_of_uterus": anterior_extent_of_uterus });
    }

    if (vitelline_follicle_arrangement != null) {
        sanitize(vitelline_follicle_arrangement);
        query["$and"].push({ "vitelline_follicle_arrangement": vitelline_follicle_arrangement });
    }

    if (apolysis != null) {
        sanitize(apolysis);
        query["$and"].push({ "apolysis": apolysis });
    }

    if (host_group != null) {
        sanitize(host_group);
        query["$and"].push({ "host_group": host_group });
    }

    if (host_family != null) {
        sanitize(host_family);
        query["$and"].push({ "host_family": host_family });
    }

    if (bothridial_features != null) {
        sanitize(bothridial_features);
        featureArray = bothridial_features.split(",");
        for (i in featureArray) {
            query["$and"].push({ "bothridial_features": featureArray[i] });
        }
    }

    if (apical_bothridial_region != null) {
        sanitize(apical_bothridial_region);
        featureArray = apical_bothridial_region.split(",");
        for (i in featureArray) {
            query["$and"].push({ "apical_bothridial_region": featureArray[i] });
        }
    }

    if (hook_placement != null) {
        sanitize(hook_placement);
        featureArray = hook_placement.split(",");
        for (i in featureArray) {
            query["$and"].push({ "hook_placement": featureArray[i] });
        }
    }

    if (hook_features != null) {
        sanitize(hook_features);
        featureArray = hook_features.split(",");
        for (i in featureArray) {
            query["$and"].push({ "hook_features": featureArray[i] });
        }
    }

    console.log("QUERY: ", query);

    const startIndex = (page - 1) * limit;

    // if (count_by_order === true) {
        console.log(collection)
        console.log(connection.collection)
        let num = await connection.collection(collection).find({}).count()
        console.log("NUM", num);
        connection
            .collection(collection)
            .find(query.$and.length == 0 ? {} : query)
            .toArray(function (err, result) {
                if (err) throw err;
                else res.json(result);
            });
    // }/
    // } else {
    //     connection
    //         .collection(collection)
    //         .find(query.$and.length == 0 ? {} : query)
    //         .skip(startIndex)
    //         .limit(limit)
    //         .toArray(function (err, result) {
    //             if (err) throw err;
    //             else res.json(result);
    //         });
    // }
});

routes.route("/feature_selection_modal_hints/").get(async function(req, res) {
    const connection = dbo.getDb();

    // ensure features feild is filled out
    if (!("features" in req.query)) {
        connection.collection("modal_hints").find().toArray((err, result)=>{
            if (err) res.status(400).send("Error fetching from feature_selector_modal_hints table")
            else res.json(result);
        })
        // res.status(400).send('endpoint requires features[] URL parameter.');
        return;
    }

    console.log("Modal request query:", req.query.features[0].split(','))


    let query = {"$or" : []};

    // get fatures from params
    let featuresList = Object.values(req.query.features)[0].split(',');
    
    // 

    // build mongo query
    featuresList.forEach((item) => {
        console.log("FEATURE LIST item: ", item);
        let [featureName, value] = item.split('=');
        console.log("f: ", featureName)
        console.log("v: ", value)
        query["$or"].push({$and: [{"feature": featureName}, {"value": value}]});
    });

    console.log("QUERY: ", query);

    // exexute query
    connection.collection("modal_hints").find(query).toArray((err, result)=>{
        if (err) res.status(400).send("Error fetching from feature_selector_modal_hints table")
        else res.json(result);
    });
})



module.exports = routes;