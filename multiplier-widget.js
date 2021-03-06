//----------------------------------------
// MULTIPLIER WIDGET
//----------------------------------------
if ("undefined" === typeof window.multiplierWidget) {

    window.multiplierWidget = function (options) {

        var zis = this;
        this.error = function (msg) {
            alert("multiplierWidget error: " + msg);
        };

        this.find = function (cssClass, jGui) {
            var jTmpEl = jGui.find("." + cssClass);
            if (jTmpEl.length) {
                return jTmpEl;
            }
            zis.error("item not found with class " + cssClass);
            throw new Error("Fix errors first...");
        };


        var o = $.extend(true, {
            gui: null,
            multiplier: null,
            multiplierClass: "multiplier",
            itemsContainerClass: "multiplier-items-container",
            addBtnClass: "multiplier-add-btn",
            itemTemplateClass: "multiplier-item-template",
            itemValuePlaceHolderClass: "multiplier-item-value-placeholder",
            deleteBtnClass: "multiplier-delete-btn",
            getCurrentValue: function (jGui, jMultiplier) {
                return jMultiplier.val();
            },
            onItemAddedAfter: function (jItem) {

            },
            onItemAddedBefore: function (value) {
                // check the value here, and return true if the value should be added, or false if it shouldn't
                return true;
            },
            onItemRemovedAfter: function (value, jItem) {
            }
        }, options);


        var jGui, jMultiplier, jItemsContainer, jAddBtn, jItemTemplate;


        if (null !== o.gui) {
            jGui = o.gui;


            if (null === o.multiplier) {
                o.multiplier = jGui.find("." + o.multiplierClass);
            }

            if (o.multiplier instanceof jQuery) {

                //----------------------------------------
                // INIT
                //----------------------------------------
                jMultiplier = o.multiplier;
                jItemsContainer = this.find(o.itemsContainerClass, jGui);
                jAddBtn = this.find(o.addBtnClass, jGui);
                jItemTemplate = this.find(o.itemTemplateClass, jGui);


                jAddBtn.on('click', function () {
                    var value = o.getCurrentValue(jGui, jMultiplier);


                    var valueIsOk = o.onItemAddedBefore(value);


                    if (valueIsOk) {
                        var jClonedItem = jItemTemplate.clone();
                        jItemsContainer.append(jClonedItem);
                        var jPlaceHolder = jClonedItem.find('.' + o.itemValuePlaceHolderClass);
                        if (jPlaceHolder.is("input")) {
                            jPlaceHolder.val(value);
                        }
                        else {
                            jPlaceHolder.html(value);
                        }

                        o.onItemAddedAfter && o.onItemAddedAfter(jClonedItem);
                    }

                    return false;
                });

                jGui.on('click.multiplierWidget', '.' + o.deleteBtnClass, function () {

                    var value;


                    var _jItemTemplate = $(this).closest("." + o.itemTemplateClass);
                    var jPlaceHolder = _jItemTemplate.find("." + o.itemValuePlaceHolderClass);

                    if (jPlaceHolder.is('input')) {
                        value = jPlaceHolder.val();
                    }
                    else {
                        value = jPlaceHolder.html();
                    }
                    o.onItemRemovedAfter && o.onItemRemovedAfter(value, _jItemTemplate);


                    _jItemTemplate.remove();
                    return false;
                });


                jGui.closest('form').on('submit.multiplierWidget', function () {
                    var jTemplatePlaceHolder = jItemTemplate.find('.' + o.itemValuePlaceHolderClass);
                    if(jTemplatePlaceHolder.length){
                        jTemplatePlaceHolder.removeAttr("name");
                    }
                });


            }
            else {
                this.error('cannot find the multiplier element, check your config or your html');
            }
        }
        else {
            this.error('bad configuration: host required');
        }
    };

}