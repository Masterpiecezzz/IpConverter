class Converter
{
    constructor()
    {
        this.btnUp = document.querySelector('div.btn-up');
        this.btnCalc = document.querySelector('div.btn-calc');
        this.btnClear = document.querySelector('div.btn-clear');
        this.placesArray = [2, 0, 1];
        this.ipBoxes = document.getElementsByClassName('ip');
        this.ipBoxesHexInput = this.ipBoxes[0].querySelector('div:nth-child(2)').getElementsByTagName('input');
        this.ipBoxesBinInput = this.ipBoxes[1].querySelector('div:nth-child(2)').getElementsByTagName('input');
        this.ipBoxesDecInput = this.ipBoxes[2].querySelector('div:nth-child(2)').getElementsByTagName('input');

        this.init();
    }

    fucnOne()
    {
        this.ipBoxes[this.placesArray[0]].style.backgroundColor = '#08F7FE';
        this.ipBoxes[this.placesArray[1]].style.backgroundColor = '#03c2c9';
        this.ipBoxes[this.placesArray[2]].style.backgroundColor = '#03c2c9';

        this.ipBoxes[this.placesArray[0]].style.zIndex = '1';
        this.ipBoxes[this.placesArray[1]].style.zIndex = '0';
        this.ipBoxes[this.placesArray[2]].style.zIndex = '-1';

        this.ipBoxes[this.placesArray[0]].style.top = '0%';
        this.ipBoxes[this.placesArray[1]].style.top = '60%';
        this.ipBoxes[this.placesArray[2]].style.top = '-60%';

        this.ipBoxes[this.placesArray[0]].style.transform = 'scale(1.05)';
        this.ipBoxes[this.placesArray[1]].style.transform = 'scale(.95)';
        this.ipBoxes[this.placesArray[2]].style.transform = 'scale(.95)';

        if (this.btnUp.style.opacity == '0') { this.btnUp.style.opacity = '1'; }
    }

    handleUpClick()
    {
        this.placesArray.unshift(this.placesArray.pop());
        this.btnUp.style.opacity = '0';
        setTimeout(() => { this.btnUp.style.display = 'none'; }, 250);
        setTimeout(() => { this.btnUp.style.display = 'flex'; }, 850);
        setTimeout(() => { this.fucnOne(); }, 950);
    }

    handleCalcClick()
    {
        if(this.placesArray[0] == 1) { this.convertBinary(); } // BIN
        else if(this.placesArray[0] == 2) // DEC
        {
            this.convertDecimal();
            this.convertBinary();
        }
        else // HEX
        {
            this.convertHex();
            this.convertBinary();
        }
    }

    convertBinary()
    {
        let temptab = [];
        for(let i = 0; i < this.ipBoxesBinInput.length; i++)
        {
            for(let x = 0; x <= 8 - this.ipBoxesBinInput[i].value.length - 1; x++) { temptab.push(0); }
            temptab.push(this.ipBoxesBinInput[i].value);
            this.ipBoxesBinInput[i].value = temptab.join('');
            let tempvalue = parseInt(temptab.join(''), 2).toString(16).toUpperCase();
            this.ipBoxesHexInput[i].value = (tempvalue.length + '0x'.length == 3) ? '0x0' + tempvalue : '0x' + tempvalue;
            this.ipBoxesDecInput[i].value = parseInt(this.ipBoxesBinInput[i].value, 2);
            temptab = [];
        }
    }

    convertDecimal()
    {
        for(let i = 0; i < this.ipBoxesDecInput.length; i++)
        {
            if(this.ipBoxesDecInput[i].value.length == 0) { this.ipBoxesDecInput[i].value = 0; }
            this.ipBoxesBinInput[i].value = Number(this.ipBoxesDecInput[i].value).toString(2);
        }
    }

    convertHex()
    {
        for(let i = 0; i < this.ipBoxesHexInput.length; i++)
        {
            if(this.ipBoxesHexInput[i].value.length == 0) { this.ipBoxesHexInput[i].value = 0; }
            if(this.ipBoxesHexInput[i].value.length == 4) { this.ipBoxesHexInput[i].value = this.ipBoxesHexInput[i].value.toString().slice(2); }
            this.ipBoxesBinInput[i].value = (parseInt(this.ipBoxesHexInput[i].value, 16).toString(2)).padStart(8, '0');
        }
    }

    handleClearClick()
    {
        for(let i = 0; i < this.ipBoxesBinInput.length; i++) { this.ipBoxesBinInput[i].value = ''; }
        for(let i = 0; i < this.ipBoxesDecInput.length; i++) { this.ipBoxesDecInput[i].value = ''; }
        for(let i = 0; i < this.ipBoxesHexInput.length; i++) { this.ipBoxesHexInput[i].value = ''; }
    }

    init()
    {
        window.addEventListener('load', () => this.fucnOne());
        this.btnUp.addEventListener('click', () => this.handleUpClick());
        this.btnCalc.addEventListener('click', () => this.handleCalcClick());
        this.btnClear.addEventListener('click', () => this.handleClearClick());
    }
}

const converter = new Converter();