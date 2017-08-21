function count() {

    var arr = [],
        flag = false, // check if after calculation (operation or pwer2 (x2) or 1/x or negate etc.)
        oFlag = false,
        $result = $('.result'),
        percentNumber = [],
        percentArr = [],
        percentStr = '',
        otest = [],
        percentDecimal = 0;

    function fixNumber(x) { //fix 2.2*2.2 or .2*.8;
        var num = x.toPrecision(15);
        //var numStr=num.toString();
        return parseFloat(num);
    }

    function sub() { //fix flowing out of show area
        var str = $result.text();
        if (str.length > 19) {

            str = str.substr(0, 19);
            $result.text(str)
        }
    }

    $('.numbers').click(function() {
        var val = $(this).attr('value');

        function num() {
            var str = $result.text();
            flag = false;
            if (arr[0] === '0' && arr.indexOf('.') === -1 && arr.indexOf('/') === -1 && arr.indexOf('*') === -1 && arr.indexOf('+') === -1 && arr.indexOf('-') === -1) {
                arr = [];
                arr = [];
                $result.text(''); //fix 0030, 00.03
                otest.push(val);
                arr.push(val);
                $result.text($result.text() + val);
                return sub();
            }
            if (oFlag && otest[0] === '0' && otest.indexOf('.') === -1 && otest.indexOf('/') === -1 && otest.indexOf('*') === -1 && otest.indexOf('+') === -1 && otest.indexOf('-') === -1) {
                otest = [];
                otest.push(val);
                console.log(otest)
                arr.splice(-1, 1, val);
                str = str.substr(0, str.length - 1) + val;
                console.log(arr);
                console.log(str)
                $result.text(str);
                return sub;
            } else {
                arr.push(val);
                otest.push(val);
                $result.text($result.text() + val);
                return sub();
            }
        }
        if (!flag) {
            num();
        };
        if (flag) {
            arr = [];
            $result.text('');
            num();
        }
    });
    $('.dot').click(function() {
        otest.push('.')

        function check() {
            var last = $result.text().slice(-1);
            if (last === '.') {
                return $result.text();
            }
            if (arr.indexOf('.') !== -1) {
                $result.text();
                return sub();
            } else {
                arr.push('.');
                $result.text($result.text() + '.');
                return sub();
            }
        }
        if (flag) {
            $result.text('');
            flag = false;
            arr = [];
            return check();
        }
        if (!flag) {
            return check();
        }
    });
    $('.operator').click(function() {
        otest = [];
        oFlag = true;
        flag = false;
        var val1 = $(this).attr('value');
        var str = $result.text();
        var strLen = (str.length) - 1;

        if (str === '') {
            return $result.text('')
        }

        if (str[strLen] === '+' || str[strLen] === '-' || str[strLen] === '*' || str[strLen] === '/') {
            str = str.substr(0, strLen);
            arr.splice(-1, 1, val1);
            return $result.text(str + val1);
        } else {
            var arrStr = fixNumber(eval(arr.join('')));
            arr = [];
            arr.push(arrStr);
            arr.push(val1);
            console.log(arr);
            return $result.text(arrStr + val1);
        } //in order to check '.' index;
    });
    $('.equal').click(function() {
        flag = true;
        var str = $result.text();
        if (str === '') {
            return $result.text('')
        } else {
            var equa = eval($result.text());
            console.log(equa)
            $result.text(fixNumber(equa));
            arr = [];
            arr.push(equa);
            percentNumber = [];
            percentArr = [];
            percentStr = '';
            percentDecimal = 0;
            return sub();
        }
    });
    $('.limitb').click(function() {
        flag = true;
        var str = $result.text();
        if (/[\+\-\*\/]/.test(arr[arr.length - 1])) { //if(arr[arr.length-1]==='+'||arr[arr.length-1]==='-'||arr[arr.length-1]==='*'||arr[arr.length-1]==='/'){
            var limi = arr[0];
            arr = [];
            arr.push(fixNumber(1 / limi));
            $result.text(fixNumber(1 / limi));
            return sub();
        }
        if (str === '') {
            return $result.text('')
        } else {
            var lim = eval($result.text());
            $result.text(fixNumber(1 / lim));
            arr = [];
            arr.push(fixNumber(1 / lim));
            return sub();
        }
    });
    $('.negate').click(function() {
        flag = true;
        var str = $result.text();
        if (/[\+\-\*\/]/.test(arr[arr.length - 1])) { //(arr[arr.length-1]==='+'||arr[arr.length-1]==='-'||arr[arr.length-1]==='*'||arr[arr.length-1]==='/'){///[\+\-\/\*]/.test(arr[i])
            var n = fixNumber(arr[0] * -1);
            arr = [];
            arr.push(n);
            console.log(arr)
            console.log(n)
            return $result.text(n);
        }

        if (str === '') {
            return $result.text('')
        } else {
            var neg = fixNumber(eval($result.text()));
            arr = [];
            arr.push(neg * -1);
            return $result.text(neg * -1);
        }
    });
    $('.back').click(function() {
        oFlag = true;
        otest = [];

        function del() {
            var str = $result.text();
            var strl = str.length - 1;
            arr.splice(-1, 1);
            $result.text(arr.join(''));
            sub();
        }

        if (flag) {
            $result.text();
        } else {
            del();
        }
    });

    /*$('.CE').click(function(){//causing infinite loop!!!
    if(flag){
        arr=[];
        flag=false;
        return $result.text('');
    }
    else{
        var ceArr=[];
        while(arr[arr.length-1]!=='+'&&arr[arr.length-1]!=='-'&&arr[arr.length-1]!=='*'&&arr[arr.length-1]!=='/'){
    	ceArr.push(arr.splice(-1,1))
    }
    return $result.text(arr.join(''));
    }
    })*/
    $('.CE').click(() => {
        if (flag) {
            arr = [];
            flag = false;
            return $result.text('');
        } else {
            if (oFlag) {
                for (let i = arr.length - 1; i >= 0; i--) {
                    if (/[\+\-\/\*]/.test(arr[i])) {
                        $result.text(arr.join(''));
                        return sub();
                    } else arr.pop();
                }
            } else {
                flag = false;
                $result.text('');
                arr = [];
                otest = [];
            }
        }
    });

    $('.C').click(function() {
        flag = false;
        oFlag = false;
        $result.text('');
        arr = [];
        otest = [];
    });
    $('.square').click(function() {
        flag = true;
        var str = $result.text();
        if (/[\+\-\*\/]/.test(arr[arr.length - 1])) { //if(arr[arr.length-1]==='+'||arr[arr.length-1]==='-'||arr[arr.length-1]==='*'||arr[arr.length-1]==='/'){
            var n = fixNumber(arr[0] * arr[0]);
            arr = [];
            arr.push(n);
            $result.text(n);
            return sub();
        }
        if (str === '') {
            return $result.text('')
        } else {
            var squa = fixNumber(eval($result.text()));
            $result.text(fixNumber(squa * squa));
            arr = [];
            arr.push(squa * squa);
            return sub();
        }
    });
    $('.sqrt').click(function() {
        flag = true;
        var str = $result.text();
        if (/[\+\-\*\/]/.test(arr[arr.length - 1])) { //if(arr[arr.length-1]==='+'||arr[arr.length-1]==='-'||arr[arr.length-1]==='*'||arr[arr.length-1]==='/'){
            var n = fixNumber(Math.sqrt(arr[0]));
            arr = [];
            arr.push(n);
            return $result.text(n);
        }
        if (str === '') {
            return $result.text('')
        } else {
            var sqt = fixNumber(Math.sqrt(eval($result.text())));
            $result.text(sqt);
            arr = [];
            arr.push(sqt);
            return sub();
        }
    });
    $('.percent').click(function() {
        function percent() {
            percentNumber = [];
            while (arr[arr.length - 1] !== '+' && arr[arr.length - 1] !== '-' && arr[arr.length - 1] !== '*' && arr[arr.length - 1] !== '/') {
                percentNumber.push(arr.splice(-1, 1))
            }
            console.log(percentNumber)
            percentArr = percentNumber.reduce(function(a, b) {
                return a.concat(b);
            }, []).reverse();
            percentDecimal = Number(percentArr.join('')) / 100;
            return percentDecimal;
        }

        if (arr.includes('+') || arr.includes('-') || arr.includes('*') || arr.includes('/')) {
            if (!isNaN(arr[arr.length - 1])) {
                var percentResult = fixNumber(eval(arr[0] * percent()));
                arr.push(percentResult);
                percentDecimal = 0;
                $result.text(arr.join(''));
                return sub();
            } else {
                arr.push(fixNumber(eval(arr[0] * arr[0] / 100)));
                $result.text(arr.join(''));
                return sub();
            }
        } else {
            arr = [];
            return $result.text('');
        }
    })
}
count();
