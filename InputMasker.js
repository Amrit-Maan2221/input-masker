class InputMasker{
    constructor(inputId, allowedRegex, maskCharacter, maskLength, notAllowedCallback){
        this.Input = document.getElementById(inputId);
        this.AllowedRegex = allowedRegex;
        this.MaskCharacter = maskCharacter;
        this.Length = maskLength;
        this.NotAllowedCallback = notAllowedCallback;

        this.SetMask();
        this.RegisterEvents();
    }


    SetMask() {
        let currentValue = this.Input.value;

        if (currentValue.length < this.Length) {
            // Append maskCharacter to fulfill the mask length
            while (currentValue.length < this.Length) {
                currentValue += this.MaskCharacter;
            }
        } else {
            // Truncate the current value to match the mask length
            currentValue = currentValue.substring(0, this.Length);
        }

        this.Input.value = currentValue;
    }

    HandlePaste(event) {
        event.preventDefault();
            let pasteData = (event.clipboardData || window.clipboardData).getData("text");
            let dataToPaste = pasteData;
            if(dataToPaste.length > this.Length){
                dataToPaste = dataToPaste.substring(0, this.Length);
            } 
            
            if(this.AllowedRegex.test(dataToPaste)){
                let targetValue = event.target.value;
                let dataIndex = 0;
                let newValue = '';
                for (let i = 0; i < targetValue.length; i++) {
                    if (targetValue[i] === this.MaskCharacter) {
                        if (dataIndex < dataToPaste.length) {
                            newValue += dataToPaste[dataIndex];
                            dataIndex++;
                        } else {
                            newValue += this.MaskCharacter;
                        }
                    } else {
                        newValue += targetValue[i];
                    }
                }

                event.target.value = newValue;
            } else{
                this.InformInputNotAllow(pasteData);
            }
    }

    HandleKeyDown(event) {
        const navkeys = ["Backspace", "Delete", "Shift", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Tab", "Enter", "Control"];
        let selectionStart = event.target.selectionStart;
        if (!this.AllowedRegex.test(event.key) && !navkeys.includes(event.key) && !(event.key.toLowerCase() === 'v' && event.ctrlKey)) {
            this.InformInputNotAllow();
            event.preventDefault();
        }
        else if (event.key === "Backspace" || event.key === "Delete") {
            if(event.target.value.length <= this.Length && !(event.key === "Backspace" && selectionStart == 0)){
                event.target.value += this.MaskCharacter;
            }
            event.target.setSelectionRange(selectionStart, selectionStart)
        }
        else if (this.AllowedRegex.test(event.key)) {
            event.preventDefault();
            let replacingIndex = event.target.value.indexOf(this.MaskCharacter);
            if (replacingIndex !== -1) { // Check if the maskCharacter is found in the inputField's value
                let inputFieldValue = event.target.value;
                inputFieldValue = inputFieldValue.substring(0, replacingIndex) + event.key + inputFieldValue.substring(replacingIndex + 1);
                event.target.value = inputFieldValue;
                event.target.setSelectionRange(replacingIndex + 1, replacingIndex + 1)
            }
        }
    }


    RegisterEvents() {
        this.Input.addEventListener('paste', (event) => {
            this.HandlePaste(event);
        });

        this.Input.addEventListener('keydown', (event) => {
            this.HandleKeyDown(event);
        });
    }

    InformInputNotAllow(input){
        if (typeof this.NotAllowedCallback === 'function') {
            this.NotAllowedCallback(input);
        }
    }
}
