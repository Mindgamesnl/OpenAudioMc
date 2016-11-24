/* 
 *
 * SoundManager 2 doesn't have a fadeTo method... say wha??
 * So, this little snippet creates one.
 * requires SoundManager2 http://www.schillmania.com/projects/soundmanager2/
 * After creating your sound  using createSound and giving it an id...
 *
 * Usage: soundManager.fadeTo('myid', 1000, 0, function(){ console.log('done') });
 *
 * @param {string} id is the sound id
 * @param {int} dur The number of milliseconds for the fade. Start with something like 1000
 * @param {int} toVol The volume to fade to, a number from 0 to 100.
 * @param {function} Optional callback to run after the sound is done fading.
 */
if(typeof soundManager !== 'undefined')
soundManager.fadeTo = function(id, dur, toVol, callback){
	dur      = dur || 1000;
	toVol    = toVol || 0;
	callback = typeof callback == 'function' ? callback : function(){};
	var s    = soundManager.getSoundById(id),
	    k    = s.volume,
	    t    = dur/Math.abs(k - toVol),
	    i    = setInterval(function(){
		        k = k > toVol ? k - 1 : k + 1;
		        s.setVolume(k);
		        if(k == toVol){ 
		                callback.call(this);
			        clearInterval(i);
			        i = null;
		        }
		}, t);	
}