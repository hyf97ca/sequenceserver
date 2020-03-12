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
            url: "http://localhost:3000/effectors?id=eq."+ effector_id +"&select=representative",//"http://localhost:3000/effectors?id=eq.PttICMP4388_AvrE1e_1&select=representative",
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

function getRepresented(representative_id) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type:'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            url: "http://localhost:3000/effectors?representative=eq." + representative_id + "&select=id",
            dataType: 'json',
            success:function(data) {
                console.log(this.url, data);
                represented = [];
                data.forEach(element => represented.push(element['id']));
                resolve(represented);
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
            url: "http://localhost:3000/effectors?id=eq."+ effector_id +"&select=cluster",//"http://localhost:3000/effectors?id=eq.PttICMP4388_AvrE1e_1&select=representative",
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

function getClustered(cluster) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type:'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            url: "http://localhost:3000/effectors?cluster=eq." + cluster + "&select=id",
            dataType: 'json',
            success:function(data) {
                console.log(this.url, data);
                clustered = [];
                data.forEach(element => clustered.push(element['id']));
                resolve(clustered);
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
            url: "http://localhost:3000/psytec?cluster=eq." + cluster + "&select=id,",
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

function getPsytecFASTA(cluster, is_nuc){
    var column = "aa_sequence"
    if (is_nuc != undefined && is_nuc === true)
        column = "dna_sequence"
    return new Promise((resolve, reject) => {
        $.ajax({
            type:'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            url: "http://localhost:3000/psytec?cluster=eq." + cluster + "&select=id," + column,
            dataType: 'json',
            success:function(data) {
                console.log(this.url, data);
                var id = data[0]['id'];
                var seq = data[0][column];
                var txt = ">" + id + "\n" + seq;
                resolve(txt);
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
    var filename = Exporter.sanitize_filename(filename_prefix) + '.txt';
    Exporter.download_blob(blob, filename);
}

export {getRepresented, getRepresentative, getCluster, getClustered, getPsytecID, getPsytecFASTA, export_txt};