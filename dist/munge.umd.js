!function(n,i){"object"==typeof exports&&"undefined"!=typeof module?i():"function"==typeof define&&define.amd?define(i):i()}(0,function(){var n={TYPES:["ascii","utf8","random"],DEFAULT:"random",ascii:function(n){return n&&n.charCodeAt()},utf8:function(n){for(var i=this.ascii(n).toString(16).toUpperCase();i.length<4;)i="0"+i;return"x"+i},random:function(n){return this[this.TYPES[Math.floor(Math.random()*this.TYPES.length)]](n)}};module.exports=function(i,o){var e,t,r=[];if((o=o||{}).encoding){if(n.TYPES.indexOf(o.encoding)<0)throw Error("Invalid encoding option given: "+o.encoding)}else o.encoding=n.DEFAULT;if(i)for(t in e=i.split(""))r[t]="&#"+n[o.encoding](e[t])+";";return r.join("")}});
//# sourceMappingURL=munge.umd.js.map
