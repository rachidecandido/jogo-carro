var ytCar = (function () {
	function ytCar(carBmpd, data, positionIndex) {
		var s = this;
		LExtends(s, LSprite, []);

		s.roadPositionList = [110, 230];

		s.changeDirTween = null;
		s.dir = positionIndex;

		s.speed = 0;

		var cBmpd = carBmpd.clone();
		cBmpd.setProperties(data.x, data.y, data.width, data.height);
		var carBmp = new LBitmap(cBmpd);
		s.addChild(carBmp);

		s.x = s.roadPositionList[positionIndex];
	}

	ytCar.prototype.moveTo = function (index, speed) {
		var s = this, toX = s.roadPositionList[index];

		if (toX == s.x || index == s.dir) {
			return;
		}

		s.dir = index;

		// Tocar o som 2.mp3 ao mover o carro
		var sound2 = document.getElementById('sound2');
		sound2.play();

		if (s.changeDirTween) {
			LTweenLite.remove(s.changeDirTween);
		}

		s.changeDirTween = LTweenLite.to(s, (speed || 0.2), {
			x: toX,
			onComplete: function (o) {
				o.x = toX;

				s.changeDirTween = null;
			}
		});
	};

	ytCar.prototype.destroy = function () {
		var s = this;

		// Parar o som 2.mp3 ao bater
		var sound2 = document.getElementById('sound2');
		sound2.pause();
		sound2.currentTime = 0;  // Reseta o tempo para 0

		// Tocar o som 3.mp3 quando o carro for destruído (perder o jogo)
		var sound3 = document.getElementById('sound3');
		sound3.play();

		if (s.changeDirTween) {
			LTweenLite.remove(s.changeDirTween);
		}

		s.remove();
	};

	return ytCar;
})();
