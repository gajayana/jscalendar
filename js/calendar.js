/*jslint vars: true, plusplus: true, devel: true, nomen: true, maxerr: 50, regexp: true, browser:true, white:true */

var jscalendar = (function (document) {
	'use strict';
	var setupCalendar = function (parent) {
			var dtNow = new Date(parent.getAttribute('data-currentdatetime')),
				lblDayNames = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'],
				lblMonthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
				daysInMonth = function (month, year) {
					return 32 - new Date(year, month, 32).getDate();
				},
				createCalendar = function(m, y) {
					var table = document.createElement('table'),
						thead = document.createElement('thead'),
						tbody = document.createElement('tbody'),
						currentYear = dtNow.getFullYear(),
						i,
						j,
						td,
						tr,
						selMonth,
						selYear,
						opt,
						setCalendar = function (mm, yy) {
							// create <tbody> contents
							var firstDay = new Date(yy, mm, 1),
								startingDay = firstDay.getDay(),
								monthLen = daysInMonth(mm, yy),
								currentDate = dtNow.getDate(),
								currentMonth = dtNow.getMonth(),
								day = 1,
								tbodyTr,
								tbodyTd,
								tdLink,
								k,
								l,
								urlDay,
								urlMonth = (mm + 1) < 10 ? '0' + (mm + 1) : (mm + 1);
							// http://print.kompas.com/beritaterbaru/2015/02/27
							for (k = 0; k < 6; k++) {
								tbodyTr = document.createElement('tr');

								if (k === 0) {
									//create empty spaces
									for (l = 0; l < startingDay; l++) {
										tbodyTd = document.createElement('td');
										tbodyTd.appendChild(document.createTextNode(' '));
										tbodyTr.appendChild(tbodyTd);
									}
								}
											
								for (l = 0; l <= 6; l++) {

									if (day <= monthLen && (k > 0 || l >= startingDay)) {
										urlDay = (day < 10) ? '0' + day : day;
										tbodyTd = document.createElement('td');
										tdLink = document.createElement('a');
										tdLink.setAttribute('href', '/beritaterbaru/' + yy + '/' + urlMonth + '/' + urlDay);
										tdLink.className = 'link-calendar';
										tdLink.textContent = day;

										if (l === 0) {
											tdLink.style.color = '#f00';
										}

										if (yy < currentYear) {
											tbodyTd.appendChild(tdLink);
										} else if (yy === currentYear) {

											if (mm < currentMonth) {
												tbodyTd.appendChild(tdLink);
											} else if (mm === currentMonth) {
												if (day <= currentDate) {
													tbodyTd.appendChild(tdLink);
													if (day === currentDate) {
														tdLink.classList.add('active');
													}
												} else {
													tbodyTd.textContent = day;
												}

											} else {
												tbodyTd.textContent = day;
											}

											
										} else {
											tbodyTd.textContent = day;	
										}

												

										tbodyTr.appendChild(tbodyTd);
										day++;
									}
												
								}

								tbody.appendChild(tbodyTr);

								if (day > monthLen) {
									break;
								}
							}
						},
						setDayNames = function (dayContainer) {
							lblDayNames.forEach(function(element) {
								var tdLblDay = document.createElement('td');
								tdLblDay.textContent = element;
								dayContainer.appendChild(tdLblDay);
							});
						},
						setMonthSelect = function (monthContainer) {
							lblMonthNames.forEach(function (element, index) {
								opt = document.createElement('option');
								opt.setAttribute('value', index);
								opt.textContent = element;

								if (index === m) {
									opt.setAttribute('selected', 'selected');
								}

								monthContainer.appendChild(opt);
							});
						},
						armSelect = function (selectMonth, selectYear) {
							var changeCalendar = function () {
								while(tbody.firstChild) {
									tbody.removeChild(tbody.firstChild);
								}

								setCalendar(parseInt(selectMonth.value, 10), parseInt(selectYear.value, 10));

							};

							selectMonth.addEventListener('change', changeCalendar, false);
							selectYear.addEventListener('change', changeCalendar, false);
						};

					// create <thead> contents
					for (i = 0; i < 2; i++) {
						tr = document.createElement('tr');

						if (i === 0) {

							td = document.createElement('td');
							selMonth = document.createElement('select');
							selYear = document.createElement('select');

							td.className = 'controls';
							td.setAttribute('colspan', 7);

							selMonth.setAttribute('name', 'sel-month');
							selYear.setAttribute('name', 'sel-year');

							setMonthSelect(selMonth);

							for (j = 2013; j <= currentYear; j++) {
								opt = document.createElement('option');
								opt.setAttribute('value', j);
								opt.textContent = j;

								if (y === j) {
									opt.setAttribute('selected', 'selected');
								}

								selYear.appendChild(opt);
							}

							td.appendChild(selMonth);
							td.appendChild(selYear);
							tr.appendChild(td);

							armSelect(selMonth, selYear);

						} else {

							setDayNames(tr);

						}


						thead.appendChild(tr);
					}

					setCalendar(m, y);
					// setCalendar(tbody, 0, 2015);

							

					table.appendChild(thead);
					table.appendChild(tbody);
							
					parent.appendChild(table);

					// event listeners

				};

			createCalendar(dtNow.getMonth(), dtNow.getFullYear());
			// console.log(dtNow);
		},
		init = function () {
			var cals = document.getElementsByClassName('js-calendar');

			if (cals.length > 0) {

				[].forEach.call(cals, function (element) {
					setupCalendar(element);	
				});
				
			}
			
		};


	return {
		init : init
	};

}(document));

window.addEventListener('load', jscalendar.init, false);