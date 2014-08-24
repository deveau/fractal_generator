/*
Fractal generator  documentation
	* 	@Author : Robert Deveau  @copy Deveau Enterprises 2012
	*  To view this in its original context visit http://bobdeveau.com/recursion/fractals.html
	*  global objects are used in order to avoid Global variables.
	*  positioning functions Forward(d, cvs), Resize(scale), Move(d), Turn(angle), DrawPolygon(n, angle, cvs)
	*  recursive positioning functions for each of the fractals
	*  a drawing function
*/
        //avoid global variables by using a global object
		Globals = {
			 x :100, //starting position x 
			 y : 300, //starting position y
			 u : 100, //step x
			 v :0 //stepy
		};
		Hilbert = {
			hilberLevel:0,
			scaleValue:0
		};
		//positioning functions 
        function Forward(d, cvs) {//gets called with only 1 and -1 for parameter d
            cvs.beginPath();
            cvs.moveTo(Globals.x, Globals.y);
            Globals.x += d * Globals.u;
            Globals.y -= d * Globals.v; 
            cvs.lineTo(Globals.x, Globals.y);
            cvs.stroke();
        }
		function Resize(scale) {
            Globals.u *= scale;
            Globals.v *= scale;
        }
        function Move(d) {
            Globals.x += d * Globals.u;
            Globals.y -= d * Globals.v;
        }
        function Turn(angle) {
            var un = Globals.u * Math.cos(angle) - Globals.v * Math.sin(angle);
            var vn = Globals.v * Math.cos(angle) + Globals.u * Math.sin(angle);
            Globals.u = un; Globals.v = vn; //turn
        } 
        function drawpoly(n, angle, cvs) {
            for (i = 0; i <= n - 1; i++) {
                Forward(1, cvs);
                Turn(angle);
            }
        }
		//recursive positioning functions for each of the fractals
		 function drawSnowflake(level, sides, cvs) {
            if (level == 0) drawpoly(sides, 2 * Math.PI / sides, cvs);
            else
                for (var i = 0; i <= sides - 1; i++)//overall structure is square, so draw 3 time
                {
                    Resize(1.0 / 2.65);
                    drawSnowflake(level - 1, sides, cvs);
                    Move(1);
                    Move(2);
                    Turn(2 * Math.PI / sides);
                    Resize(2.65);
                }
            }
			
        function drawkotch(level, cvs) {
            if (level == 0) Forward(1, cvs);
            else {
                Resize(1.0 / 3.0);
                drawkotch(level - 1, cvs);
                Turn(Math.PI / 3.0);
                drawkotch(level - 1, cvs);
                Turn(-2 * Math.PI / 3.0);
                drawkotch(level - 1, cvs);
                Turn(Math.PI / 3.0); drawkotch(level - 1, cvs);
                Resize(3.0);
            }
        }
        function DrawBush(level, cvs) {
            if (level == 0) {
                Forward(1, cvs);
                Move(-1);
            }
            else {
                Resize(0.5);
                DrawBush(level - 1, cvs);
                Move(1);
                DrawBush(level - 1, cvs);
                Turn(Math.PI / 6.0);
                DrawBush(level - 1, cvs);
                Turn(-2 * Math.PI / 6.0);
                DrawBush(level - 1, cvs);
                Turn(Math.PI / 6.0);
                Move(-1);
                Resize(2);
            }
        }

        function DrawHilbert(level,direction,cvs){
		  if (level==0) {
			switch (direction) {
				case "LEFT":
					Globals.u = 200.0/Hilbert.scaleValue; Globals.v = 0; Forward(1, cvs);      
					Globals.u = 0; Globals.v = 200.0/Hilbert.scaleValue; Forward(1, cvs);       
					Globals.u = 200.0/Hilbert.scaleValue; Globals.v = 0; Forward(-1, cvs);
				  break;
				case "RIGHT":
					Globals.u = 200.0/Hilbert.scaleValue; Globals.v = 0; Forward(-1, cvs);
					Globals.u = 0; Globals.v = 200.0/Hilbert.scaleValue; Forward(-1, cvs);
					Globals.u = 200.0/Hilbert.scaleValue; Globals.v = 0; Forward(1, cvs);
				  break;
				case "UP":
				  Globals.u=0;Globals.v=200.0/Hilbert.scaleValue;Forward(1,cvs);
				  Globals.u=200.0/Hilbert.scaleValue;Globals.v=0;Forward(1,cvs);
				  Globals.u=0;Globals.v=200.0/Hilbert.scaleValue;Forward(-1,cvs);
				  break;
				case "DOWN":
				  Globals.u=0;Globals.v=200.0/Hilbert.scaleValue;Forward(-1,cvs);
				  Globals.u=200.0/Hilbert.scaleValue;Globals.v=0;Forward(-1,cvs);
				  Globals.u=0;Globals.v=200.0/Hilbert.scaleValue;Forward(1,cvs);
				  break;
			} //end switch
		  } //endif
		  else {
			switch (direction) {
			case "LEFT":
				DrawHilbert(level - 1, "UP", cvs);
			  Globals.u=200.0/Hilbert.scaleValue;Globals.v=0;Forward(1,cvs);
			  DrawHilbert(level - 1, "LEFT", cvs);
			  Globals.u=0;Globals.v=200.0/Hilbert.scaleValue;Forward(1,cvs);
			  DrawHilbert(level - 1, "LEFT", cvs);
			  Globals.u=200.0/Hilbert.scaleValue;Globals.v=0;Forward(-1,cvs);
			  DrawHilbert(level - 1, "DOWN", cvs);
			  break;
			case "RIGHT":
				DrawHilbert(level - 1, "DOWN", cvs);
			  Globals.u=200.0/Hilbert.scaleValue;Globals.v=0;Forward(-1,cvs);
			  DrawHilbert(level - 1, "RIGHT", cvs);
			  Globals.u=0;Globals.v=200.0/Hilbert.scaleValue;Forward(-1,cvs);
			  DrawHilbert(level - 1, "RIGHT", cvs);
			  Globals.u=200.0/Hilbert.scaleValue;Globals.v=0;Forward(1,cvs);
			  DrawHilbert(level - 1, "UP", cvs);
			  break;
			case "UP":
				DrawHilbert(level - 1, "LEFT", cvs);
			  Globals.u=0;Globals.v=200.0/Hilbert.scaleValue;Forward(1,cvs);
			  DrawHilbert(level - 1, "UP", cvs);
			  Globals.u=200.0/Hilbert.scaleValue;Globals.v=0;Forward(1,cvs);
			  DrawHilbert(level - 1, "UP", cvs);
			  Globals.u=0;Globals.v=200.0/Hilbert.scaleValue;Forward(-1,cvs);
			  DrawHilbert(level - 1, "RIGHT", cvs);
			  break;
			case "DOWN":
				DrawHilbert(level - 1, "RIGHT", cvs);
			  Globals.u=0;Globals.v=200.0/Hilbert.scaleValue;Forward(-1,cvs);
			  DrawHilbert(level - 1, "DOWN", cvs);
			  Globals.u=200.0/Hilbert.scaleValue;Globals.v=0;Forward(-1,cvs);
			  DrawHilbert(level - 1, "DOWN", cvs);
			  Globals.u=0;Globals.v=200.0/Hilbert.scaleValue;Forward(1,cvs);
			  DrawHilbert(level - 1, "LEFT", cvs);
			  break;
			} //end switch
		  } //endelse
		}//end DrawHilBert
		
        function DrawHangman(level, cvs) {
            if (level == 0) {
                Forward(1, cvs); Turn(Math.PI / 2.0); Forward(1, cvs);
                Move(-1); Turn(-Math.PI / 2); Move(-1);
            }
            else {
                Resize(0.5);
                DrawHangman(level - 1, cvs);
                Move(1);
                DrawHangman(level - 1, cvs);
                Move(1);
                Turn(Math.PI / 2.0);
                Move(1);
                DrawHangman(level - 1, cvs);
                //original position
                Move(-1); Turn(-Math.PI / 2.0); Move(-1);
                Move(-1);
                Resize(2);
            }
        }
		
        function DrawRectangleCurve(level, cvs) {
            if (level == 0) {
                Forward(1, cvs);
            }
            else {
                Resize(1.0 / 3.0);
                DrawRectangleCurve(level - 1, cvs);
                Turn(Math.PI / 2.0);
                DrawRectangleCurve(level - 1, cvs);
                Turn(-Math.PI / 2.0);
                DrawRectangleCurve(level - 1, cvs);
                Turn(-Math.PI / 2.0);
                DrawRectangleCurve(level - 1, cvs);
                Turn(Math.PI / 2.0);
                DrawRectangleCurve(level - 1, cvs);
                Resize(3.0);
            }
        }

        function DrawTree(level, cvs) {
            if (level == 0) { Forward(1, cvs); Move(-1); }
            else {
                Forward(1, cvs);
                Resize(0.73);
                Turn(Math.PI / 6.0);
                DrawTree(level - 1, cvs);
                //Move(-1);
                Turn(-2 * Math.PI / 6.0);
                DrawTree(level - 1, cvs);
                //Move(-1);
                Resize(1.0 / 0.73);
                Turn(Math.PI / 6.0); //move back to original angle
                Move(-1);
            }
        }
			
		function DrawSerspinski(level, sides, cvs) {
			if (level == 0) drawpoly(sides, 2 * Math.PI / sides, cvs);
			else
				for (var i = 0; i <= sides - 1; i++){//draw 3 times
					Resize(1.0 / 2.0);
					DrawSerspinski(level - 1, sides, cvs);
					Move(2);
					Turn(2 * Math.PI / sides);
					Resize(2.0);
				}
		}
        //draw all of the fractals
            function draw() {
                var canvas = document.getElementById('canvas1'); 
                if (canvas.getContext) {
                    var cvs = canvas.getContext('2d'); 
					cvs.strokeStyle  = "#000000";
					cvs.lineWidth = 2;
					cvs.lineCap = 'square';
                    cvs.clearRect(0, 0, canvas.width, canvas.height);
                    //retrieve type and value from html page
                    var fractalType = document.getElementById("fractype").value;
                    var nIterations = parseInt(document.getElementById("numrecurse").value);

                    switch (fractalType) {
                        
                        case "Snowflake":
                            Globals.x = 110; Globals.y = 450;
                            Globals.u = 250; Globals.v = 0;
                            drawSnowflake(nIterations, 5, cvs);
                            break;
                        case "Squares":
                            //set up for curve 2
                            Globals.x = 50;
                            Globals.u = 400; Globals.v = 0;
                            DrawRectangleCurve(nIterations, cvs);
                            break;
                        case "Tree":
                            //  set up for tree:
                            Globals.x = 250; Globals.y = 450;
                            Globals.u = 0;
                            Globals.v = 120; //tree gonna 'grow' upward
                            DrawTree(nIterations, cvs);
                            break;
                        case "Bush":
                            //  set up for bush:
                            Globals.x = 250; Globals.y = 450;
                            Globals.u = 0;
                            Globals.v = 400;
                            DrawBush(nIterations, cvs);
                            break;
                        case "Hangman":
                            // setup for hangman:
                            Globals.x = 50; Globals.y = 450;
                            Globals.u = 400; Globals.v = 0;
                            DrawHangman(nIterations, cvs);
                            break;
						case "Serp triangle":
                            Globals.x = 25; Globals.y = 425;
                            Globals.u = 450; Globals.v = 0;
                            DrawSerspinski(nIterations, 3, cvs);
                            break;
                        case "Koch":
                            Globals.x = 50; Globals.y = 270;
                            Globals.u = 400; Globals.v = 0;
                            drawkotch(nIterations, cvs);
                            break;
                        case "Hilbert":
                            //set up hilbert
                            Globals.x = 50;
                            Globals.y = 450;
                            Hilbert.hilberLevel = nIterations;
                            Hilbert.scaleValue = Math.pow(2, Hilbert.hilberLevel);
                            DrawHilbert(Hilbert.hilberLevel, "UP", cvs);
                            break;
                    }
                }
            }


