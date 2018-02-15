[{"id":"969b038f.4773c8","type":"function","z":"e613fe08.5ee6f","name":"Send Message","func":"msg.url = flow.get('twiliosendcloudfunction');\nmsg.payload = {\n    from: '+'+flow.get('twiliophonenumber'),\n    to: '+1'+flow.get('phonenumber'),\n    body: flow.get('textmessage'),\n    image: flow.get('watermarkopenwhiskaction')+'?watermark='+encodeURIComponent(flow.get('watermarkimage'))+'&width=470&image='+encodeURIComponent(flow.get('currentphoto').url)\n};\nreturn msg;\n","outputs":1,"noerr":0,"x":900,"y":700,"wires":[["e572d5a8.1ebb68"]]},{"id":"f00dfb69.6be6e8","type":"debug","z":"e613fe08.5ee6f","name":"","active":true,"console":"false","complete":"false","x":1270,"y":740,"wires":[]},{"id":"e572d5a8.1ebb68","type":"http request","z":"e613fe08.5ee6f","name":"Call Cloud Function","method":"POST","ret":"obj","url":"https://openwhisk.ng.bluemix.net/api/v1/web/---_---/public/twilio_send_message.json ","tls":"","x":1090,"y":700,"wires":[["f00dfb69.6be6e8","522fc504.051f5c"]]},{"id":"95be6b97.2d9c","type":"link out","z":"e613fe08.5ee6f","name":"","links":["88da15.6aef65e8"],"x":855,"y":840,"wires":[]},{"id":"522fc504.051f5c","type":"change","z":"e613fe08.5ee6f","name":"Set Notification","rules":[{"t":"set","p":"payload","pt":"msg","to":"Text Message Sent","tot":"str"}],"action":"","property":"","from":"","to":"","reg":false,"x":1280,"y":700,"wires":[["8f473864.03e2a"]]},{"id":"2bf14d3d.f3d37a","type":"twitter out","z":"e613fe08.5ee6f","twitter":"","name":"Tweet","x":1430,"y":780,"wires":[]},{"id":"5c5d1d42.c6ef14","type":"switch","z":"e613fe08.5ee6f","name":"SMS #?","property":"phonenumber","propertyType":"flow","rules":[{"t":"neq","v":"","vt":"str"}],"checkall":"true","outputs":1,"x":740,"y":700,"wires":[["969b038f.4773c8"]]},{"id":"da7aafc4.5fe56","type":"switch","z":"e613fe08.5ee6f","name":"Twitter Handle?","property":"twitterhandle","propertyType":"flow","rules":[{"t":"neq","v":"","vt":"str"}],"checkall":"true","outputs":1,"x":760,"y":780,"wires":[["59673d04.337ee4"]]},{"id":"92951968.869858","type":"http request","z":"e613fe08.5ee6f","name":"","method":"GET","ret":"bin","url":"","tls":"","x":1090,"y":780,"wires":[["3a48a9d8.34f6b6"]]},{"id":"59673d04.337ee4","type":"function","z":"e613fe08.5ee6f","name":"Fetch Image","func":"msg.url = flow.get('watermarkopenwhiskaction')+'?watermark='+encodeURIComponent(flow.get('watermarkimage'))+'&width=470&image='+encodeURIComponent(flow.get('currentphoto').url);\nreturn msg;\n","outputs":1,"noerr":0,"x":930,"y":780,"wires":[["92951968.869858"]]},{"id":"b998bc3c.d3d44","type":"change","z":"e613fe08.5ee6f","name":"Set Notification","rules":[{"t":"set","p":"payload","pt":"msg","to":"Tweet Sent","tot":"str"}],"action":"","property":"","from":"","to":"","reg":false,"x":1460,"y":820,"wires":[["563e965e.dcea18"]]},{"id":"20c4043.02ca0fc","type":"delay","z":"e613fe08.5ee6f","name":"","pauseType":"delay","timeout":"2","timeoutUnits":"seconds","rate":"1","nbRateUnits":"1","rateUnits":"second","randomFirst":"1","randomLast":"5","randomUnits":"seconds","drop":false,"x":740,"y":840,"wires":[["95be6b97.2d9c"]]},{"id":"3a48a9d8.34f6b6","type":"change","z":"e613fe08.5ee6f","name":"","rules":[{"t":"set","p":"media","pt":"msg","to":"payload","tot":"msg"},{"t":"set","p":"payload","pt":"msg","to":"tweetmessage","tot":"flow"},{"t":"change","p":"payload","pt":"msg","from":"{{username}}","fromt":"str","to":"twitterhandle","tot":"flow"}],"action":"","property":"","from":"","to":"","reg":false,"x":1260,"y":780,"wires":[["2bf14d3d.f3d37a","b998bc3c.d3d44"]]},{"id":"481f7248.77cf14","type":"ui_button","z":"e613fe08.5ee6f","name":"","group":"43b83d68.e73d3c","order":4,"width":"6","height":"1","passthru":false,"label":"Send Photo","color":"","bgcolor":"","icon":"","payload":"","payloadType":"str","topic":"","x":546.6666641235352,"y":711.6666679382324,"wires":[["5c5d1d42.c6ef14","da7aafc4.5fe56","20c4043.02ca0fc"]]},{"id":"8f473864.03e2a","type":"ui_toast","z":"e613fe08.5ee6f","position":"top right","displayTime":"3","highlight":"","outputs":0,"ok":"OK","cancel":"","topic":"","name":"","x":1490,"y":700,"wires":[]},{"id":"563e965e.dcea18","type":"ui_toast","z":"e613fe08.5ee6f","position":"top right","displayTime":"3","highlight":"","outputs":0,"ok":"OK","cancel":"","topic":"","name":"","x":1650,"y":820,"wires":[]},{"id":"6f8ff155.5565b8","type":"inject","z":"e613fe08.5ee6f","name":"Startup","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":true,"x":160,"y":1620,"wires":[["33ad232b.dd7a1c"]]},{"id":"33ad232b.dd7a1c","type":"change","z":"e613fe08.5ee6f","name":"Set Configuration","rules":[{"t":"set","p":"watermarkopenwhiskaction","pt":"flow","to":"https://openwhisk.ng.bluemix.net/api/v1/web/---_---/default/watermark.http","tot":"str"},{"t":"set","p":"watermarkimage","pt":"flow","to":"","tot":"str"},{"t":"set","p":"imageplaceholder","pt":"flow","to":"","tot":"str"},{"t":"set","p":"twiliophonenumber","pt":"flow","to":"+15555555555","tot":"str"},{"t":"set","p":"textmessage","pt":"flow","to":"Thanks for visiting the IBM booth","tot":"str"},{"t":"set","p":"twiliosendcloudfunction","pt":"flow","to":"https://openwhisk.ng.bluemix.net/api/v1/web/---_---/public/twilio_send_message.json ","tot":"str"},{"t":"set","p":"tweetmessage","pt":"flow","to":"@{{username}} Thanks for visiting the IBM booth!","tot":"str"}],"action":"","property":"","from":"","to":"","reg":false,"x":330,"y":1620,"wires":[["13c57d9.5bb5982"]]},{"id":"13c57d9.5bb5982","type":"link out","z":"e613fe08.5ee6f","name":"On Startup","links":["14c960bd.0291bf","4bb02784.483a48","88da15.6aef65e8"],"x":455,"y":1620,"wires":[]},{"id":"620e6689.298e88","type":"change","z":"e613fe08.5ee6f","name":"Clear Payload","rules":[{"t":"set","p":"payload","pt":"msg","to":"","tot":"str"}],"action":"","property":"","from":"","to":"","reg":false,"x":460,"y":460,"wires":[["cfbb0691.22b958","50d379bd.6114b"]]},{"id":"50d379bd.6114b","type":"ui_text_input","z":"e613fe08.5ee6f","name":"","label":"Phone #","group":"43b83d68.e73d3c","order":2,"width":0,"height":0,"passthru":true,"mode":"text","delay":"700","topic":"","x":658.333324432373,"y":419.9999986886978,"wires":[["53e30d71.699bb4","9f3e71e9.e92778"]]},{"id":"cfbb0691.22b958","type":"ui_text_input","z":"e613fe08.5ee6f","name":"","label":"Twitter @Handle","group":"43b83d68.e73d3c","order":2,"width":0,"height":0,"passthru":true,"mode":"text","delay":"700","topic":"","x":676.6666259765625,"y":521.6666259765625,"wires":[["f21014fa.2402e8","a23c5c26.3955a"]]},{"id":"9f3e71e9.e92778","type":"debug","z":"e613fe08.5ee6f","name":"","active":true,"console":"false","complete":"false","x":830,"y":380,"wires":[]},{"id":"53e30d71.699bb4","type":"change","z":"e613fe08.5ee6f","name":"Set #","rules":[{"t":"set","p":"phonenumber","pt":"flow","to":"payload","tot":"msg"}],"action":"","property":"","from":"","to":"","reg":false,"x":808.333324432373,"y":419.9999986886978,"wires":[[]]},{"id":"f21014fa.2402e8","type":"debug","z":"e613fe08.5ee6f","name":"","active":true,"console":"false","complete":"false","x":870,"y":480,"wires":[]},{"id":"a23c5c26.3955a","type":"change","z":"e613fe08.5ee6f","name":"Set Twitter Handle","rules":[{"t":"set","p":"twitterhandle","pt":"flow","to":"payload","tot":"msg"},{"t":"change","p":"twitterhandle","pt":"flow","from":"@","fromt":"str","to":"","tot":"str"}],"action":"","property":"","from":"","to":"","reg":false,"x":886.666618347168,"y":521.6666469573975,"wires":[[]]},{"id":"43b83d68.e73d3c","type":"ui_group","z":0,"name":"Send Photo","tab":"4f8cae91.6bab6","disp":true,"width":"6"},{"id":"4f8cae91.6bab6","type":"ui_tab","z":0,"name":"Photo Booth","icon":"dashboard"}]