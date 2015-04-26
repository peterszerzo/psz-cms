APP.FormField = function(name, validRegExp) {

    this.name = name;
    this.inputElement = $("#" + this.name);

    this.defaultValue = this.inputElement.attr("data-filler") || ""; //defaultValue;

    this.validRegExp = validRegExp;

    // insert filler if input field is empty
    this.onBlur();

};

APP.FormField.prototype = {

    getValue: function() {

        return this.inputElement.val();

    },

    isValid: function() {

        var val = this.getValue();

        if (typeof val === "undefined") return false;
        return (val.match(this.validRegExp) && (val !== this.defaultValue));

    },

    isDefault: function() {

        return (this.getValue() === this.defaultValue);

    },

    isEmpty: function() {

        return (this.getValue() === "");

    },

    setEmpty: function() {

        this.inputElement.val("");

        return this;

    },

    setDefault: function() {

        this.inputElement.val(this.defaultValue);

        return this;

    },

    activate: function() {

        this.inputElement.removeClass("greyForm");

        return this;

    },

    deactivate: function() {

        this.inputElement.addClass("greyForm");

        return this;

    },

    onFocus: function() {

        if (this.isDefault()) {

            this.setEmpty().activate();

        }

        if (!this.isValid()) {

            this.inputElement.parent().next().children().html("&#8230;").fadeIn("slow");

        } else {

            this.inputElement.parent().next().children().html("&#10003;");

        }

    },

    onBlur: function() {

        if (this.isEmpty()) {

            this.setDefault().deactivate();

        }

        if (!this.isValid()) {

            this.inputElement.parent().next().children().fadeOut("slow");

        } else {

            this.inputElement.parent().next().children().html("&#10003;");

        }

    },

    onKeyUp: function() {

        if (this.isValid()) {

            this.inputElement.parent().next().children().html("&#10003;");

        } else {

            this.inputElement.parent().next().children().html("&#8230;");

        }

    },

    validate: function() {

        var defaultValue = this.defaultValue,
            that = this;

        this.inputElement.focus(function() {

            that.onFocus();
            APP.form.setSubmitState();

        }).blur(function() {

            that.onBlur();
            APP.form.setSubmitState();

        }).keyup(function() {

            that.onKeyUp();
            APP.form.setSubmitState();

        });

    }

};


APP.Form = function(fields) {

    this.fields = fields;

    return this;

};

APP.Form.prototype = {

    isValid: function() {

        var i, max = this.fields.length;

        for (i = 0; i < max; i += 1) {

            if (!this.fields[i].isValid()) {

                return false;

            }

        }

        return true;

    },

    validate: function() {

        var i, max = this.fields.length;

        for (i = 0; i < max; i += 1) {

            this.fields[i].validate();

        }

    },

    setSubmitState: function() {

        if (this.isValid()) {

            $("#submit").removeAttr("disabled");

        } else {

            $("#submit").attr("disabled", "disabled");

        }

    }

};

APP.form = new APP.Form([

    new APP.FormField("name", /^\s*\S.*$/),
    new APP.FormField("email", /\S+@\S+\.\S+/),
    new APP.FormField("message", /^\s*\S.*$/)

]);

APP.form.validate();
