function escapeText(val) {
    if (typeof val != 'string')
    return val;
    return val.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
        switch (char) {
            case "\0":
                return "\\0";
            case "\x08":
                return "\\b";
            case "\x09":
                return "\\t";
            case "\x1a":
                return "\\z";
            case "\n":
                return "\\n";
            case "\r":
                return "\\r";
            case "\"":
            case "'":
            case "\\":
            case "%":
                return "\\"+char; // prepends a backslash to backslash, percent,
                                  // and double/single quotes
        }
    });
};


function getFieldsString(tableOptions) {

}

/*
 *
 *
 */
function getValuesString(model, data) {

    var { fields } = model

    return fields.map((field) => {

        var value = data[field.key]
        if (value == null) { value = defaults[field.key] }

        if (_.isArray(value) || _.isObject(value)) { 
            value = `'${JSON.stringify(value)}'`; 
        } else if (_.isString(value)) {
            let escapeMarker = '';
            if (value.length > 50) { escapeMarker = 'E'; }
            value = `${escapeMarker}'${escapeText(value)}'`;
        }

        return value

    }).join(',')

}