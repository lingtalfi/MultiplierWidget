MultiplierWidget
===========
2018-04-04



A javascript object that can multiply items.




Why?
==========================

We can use this in forms, for instance when you want the user to be able to select
multiple products from your database.



How?
========

```php
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script
            src="https://code.jquery.com/jquery-3.3.1.min.js"
            integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
            crossorigin="anonymous"></script>

    <script src="/libs/multiplier-widget/multiplier-widget.js"></script>

</head>

<body>


<form method="post" action="">


    <div class="multiplier-gui">

        <div>


            <div class="multiplier-items-container">

            </div>

            <div>
                <select class="multiplier">
                    <option value="a">a</option>
                    <option value="b">b</option>
                    <option value="c">c</option>
                </select>
            </div>
            <button class="multiplier-add-btn">Add</button>
            <div style="display: none">
                <div class="multiplier-item-template">
                    My value is <span class="multiplier-item-value-placeholder"></span>
                    <button class="multiplier-delete-btn">Delete</button>
                </div>
            </div>

        </div>


    </div>
</form>


<script>
    $(document).ready(function () {


        var jGui = $(".multiplier-gui");
        var o = new window.multiplierWidget({
            gui: jGui
        });

    });
</script>


</body>
</html>
```





History Log
------------------
        
- 1.1.0 -- 2018-04-04

    - now handles placeholders of type input

- 1.0.0 -- 2018-04-04

    - initial commit




