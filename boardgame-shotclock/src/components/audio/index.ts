// Exports a stable URL and helper functions to manage the alarm audio
export const alarmUrl = new URL("./meanAlarm.wav", import.meta.url).href;

let _alarm: HTMLAudioElement | null = null;

function getAlarm() {
	if (!_alarm) {
		_alarm = new Audio(alarmUrl);
		_alarm.loop = true;
	}
	return _alarm;
}

export function playAlarmLoop(): Promise<void> | undefined {
	const a = getAlarm();
	try {
		a.currentTime = 0;
		const p = a.play();
		if (p && typeof (p as Promise<void>).catch === 'function') {
			(p as Promise<void>).catch((err) => {
				console.warn('Alarm play failed', alarmUrl, err);
			});
		}
		return p as Promise<void> | undefined;
	} catch (e) {
		console.warn('Alarm play threw', alarmUrl, e);
		return undefined;
	}
}

export function stopAlarm() {
	if (_alarm) {
		try {
			_alarm.pause();
			_alarm.currentTime = 0;
		} catch (e) {
			// ignore
		}
	}
}
