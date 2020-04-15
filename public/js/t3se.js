/**
 * Yi Fei Huang
 * Functions used by T3SE extension for sequenceserver.
 */

import * as Exporter from './exporter';
import _ from 'underscore';

function getRepresentative(effector_id) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type:'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            url: "https://hopper.csb.utoronto.ca:8774/effectors?id=eq."+ effector_id +"&select=representative",//"https://hopper.csb.utoronto.ca:8774/effectors?id=eq.PttICMP4388_AvrE1e_1&select=representative",
            dataType: 'json',
            success:function(data) {
                console.log(this.url, data);
                resolve(data[0]['representative']);
            },
            contentType: false,//'text/plain',
            fail:function() {
                reject("FAILED AJAX");
                console.log("failed ajax");
            }
        });
    });  
}

function getRepresented(representative_id, is_nuc) {
    var column = "aa_sequence"
    if (is_nuc != undefined && is_nuc === true)
        column = "dna_sequence"
    return new Promise((resolve, reject) => {
        $.ajax({
            type:'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            url: "https://hopper.csb.utoronto.ca:8774/effectors?representative=eq." + representative_id + "&select=id," + column,
            dataType: 'json',
            success:function(data) {
                console.log(this.url, data);
                represented = [];
                sequences = [];
                data.forEach(element => represented.push(element['id']));
                data.forEach(element => sequences.push(element[column]));
                resolve([represented, sequences]);
            },
            contentType: false,//'text/plain',
            fail:function() {
                reject("FAILED AJAX");
                console.log("failed ajax");
            }
        });
    });  
}

function getCluster(effector_id) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type:'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            url: "https://hopper.csb.utoronto.ca:8774/effectors?id=eq."+ effector_id +"&select=cluster",//"https://hopper.csb.utoronto.ca:8774/effectors?id=eq.PttICMP4388_AvrE1e_1&select=representative",
            dataType: 'json',
            success:function(data) {
                console.log(this.url, data);
                resolve(data[0]['cluster']);
            },
            contentType: false,//'text/plain',
            fail:function() {
                reject("FAILED AJAX");
                console.log("failed ajax");
            }
        });
    });  
}

function getClustered(cluster, is_nuc) {
    var column = "aa_sequence"
    if (is_nuc != undefined && is_nuc === true)
        column = "dna_sequence"
    return new Promise((resolve, reject) => {
        $.ajax({
            type:'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            url: "https://hopper.csb.utoronto.ca:8774/effectors?cluster=eq." + cluster + "&select=id," + column,
            dataType: 'json',
            success:function(data) {
                console.log(this.url, data);
                clustered = [];
                sequences = [];
                data.forEach(element => clustered.push(element['id']));
                data.forEach(element => sequences.push(element[column]));
                resolve([clustered, sequences]);
            },
            contentType: false,//'text/plain',
            fail:function() {
                reject("FAILED AJAX");
                console.log("failed ajax");
            }
        });
    });  
}

function getPsytecID(cluster){
    return new Promise((resolve, reject) => {
        $.ajax({
            type:'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            url: "https://hopper.csb.utoronto.ca:8774/psytec?cluster=eq." + cluster + "&select=id",
            dataType: 'json',
            success:function(data) {
                resolve(data[0]['id']);
            },
            contentType: false,//'text/plain',
            fail:function() {
                reject("FAILED AJAX");
                console.log("failed ajax");
            }
        });
    });  
}

function getPsytecFASTA(cluster, is_nuc, is_syn){
    var column = "aa_sequence"
    if (is_nuc != undefined && is_nuc === true)
    {
        if (is_syn != undefined && is_syn === true)
            column = "syn_sequence"
        else
            column = "dna_sequence"
    }
        
    return new Promise((resolve, reject) => {
        $.ajax({
            type:'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            url: "https://hopper.csb.utoronto.ca:8774/psytec?cluster=eq." + cluster + "&select=id," + column,
            dataType: 'json',
            success:function(data) {
                console.log(this.url, data);
                var id = data[0]['id'];
                var seq = data[0][column];
                var txt = ">" + id + "\n" + seq;
                resolve([id, txt]);
            },
            contentType: false,//'text/plain',
            fail:function() {
                reject("FAILED AJAX");
                console.log("failed ajax");
            }
        });
    });  
}

// function representativesButton() {
//     return {
//         text: 'Representatives',
//         icon: 'fa-download',
//         className: 'representatives-fa',
//         onClick: () => this.downloadAlignment()
//     };
// }

function export_txt(txt, filename_prefix) {

    var blob = new Blob([txt], { type: 'text/plain'});
    //var filename = Exporter.sanitize_filename(filename_prefix) + '.txt';
    
    //Exporter.download_blob(blob, filename);
    Exporter.open_blob(blob);
}

function getAlignments() {
    //TODO: Dynamically populate a list from server side.
    return [
        "AvrA",
        "AvrB",
        "AvrE",
        "AvrPto",
        "AvrRpm",
        "AvrRpt",
        "HopA",
        "HopAA",
        "HopAB",
        "HopAD",
        "HopAF",
        "HopAG",
        "HopAH",
        "HopAI",
        "HopAL",
        "HopAM",
        "HopAQ",
        "HopAR",
        "HopAS",
        "HopAT",
        "HopAU",
        "HopAW",
        "HopAX",
        "HopAZ",
        "HopB",
        "HopBA",
        "HopBC",
        "HopBD",
        "HopBE",
        "HopBF",
        "HopBG",
        "HopBH",
        "HopBI",
        "HopBJ",
        "HopBK",
        "HopBL",
        "HopBM",
        "HopBN",
        "HopBO",
        "HopBP",
        "HopBQ",
        "HopBR",
        "HopBS",
        "HopC",
        "HopD",
        "HopE",
        "HopF",
        "HopG",
        "HopH",
        "HopI",
        "HopK",
        "HopL",
        "HopM",
        "HopN",
        "HopO",
        "HopQ",
        "HopR",
        "HopS",
        "HopT",
        "HopU",
        "HopV",
        "HopW",
        "HopX",
        "HopY",
        "HopZ"
    ];
}

export {getRepresented, getRepresentative, getCluster, getClustered, getPsytecID, getPsytecFASTA, export_txt, getAlignments};