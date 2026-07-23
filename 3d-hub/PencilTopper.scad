/*[Name Settings]*/
text_string      = "Mia";
font_name        = "Comic Neue:style=Bold"; // font
//Height (size) of the text, mm
letter_height    = 12;   
// Height of the raised text on top, mm
letter_thickness = 1.5;  
// Height (size) of the base, mm
base_height      = 12;   
// How far the outline expands beyond the text, mm
outline_margin   = 2.5;    

/*[Emoji]*/
//Don't change this font
emoji_font_name  = "Noto Emoji:style=Bold"; 
//Popular Emoji
//Copy emoji from here: https://fonts.google.com/noto/specimen/Noto+Emoji/glyphs
emoji_text = "🦄";
emoji_size = 11;
emoji_x_offset = -1;
emoji_y_offset = 1;


/*[Hole Settings]*/
hole_orientation = "FRONTBACK";   // ["FRONTBACK", "TOPBOTTOM"]
hole_diameter    = 7.8;           // mm
hole_length      = 150;           // mm (≥ base_height when TOPBOTTOM; ≥ name depth when FRONTBACK)
hole_x           = 21;            // Adjust for TOPBOTTOM hole, mm
hole_y           = 4;             // Adjust for FRONTBACK hole, mm 
hole_z           = base_height / 2; // mm

/*[Color]*/
// color of the outline/base
base_color    = "#1B40D1";  
// color of the raised letters 
letters_color = "#FFFFFF";  

module base_with_tunnel() {
    metrics = textmetrics(
                    text_string,
                    size   = letter_height,
                    font   = font_name,
                    halign = "left",
                    valign = "baseline"
                );
    text_width = metrics.size.x;
    difference() {
            linear_extrude(height = base_height){
            offset(delta = outline_margin)
                text(
                    text_string,
                    size   = letter_height,
                    font   = font_name,
                    halign = "left",
                    valign = "baseline"
                );
                translate([text_width+emoji_x_offset,emoji_y_offset,0])  offset(delta = outline_margin) text(
                    emoji_text,
                    size   = emoji_size,
                    font   = emoji_font_name,
                    halign = "left",
                    valign = "baseline"
                );
            }
        // ────────────────────────────────────────────────────────
        // Tunnel cylinder
        //    – FRONTBACK: cuts front/back faces, axis = X:
        //    – TOPBOTTOM: cuts top/bottom faces, axis = Y:
        // ────────────────────────────────────────────────────────
        if (hole_orientation == "FRONTBACK") {
            translate([ 0, hole_y, hole_z ])
                rotate([ 0, 90, 0 ])
                    cylinder(
                        d      = hole_diameter,
                        h      = hole_length,
                        center = true,
                        $fn    = 100
                    );
        }
        else if (hole_orientation == "TOPBOTTOM") {
            translate([ hole_x, 0, hole_z ])
                rotate([ 90, 0, 0 ])
                    cylinder(
                        d      = hole_diameter,
                        h      = hole_length,
                        center = true,
                        $fn    = 100
                    );
        }
        else {
            echo("Error: hole_orientation must be \"FRONTBACK\" or \"TOPBOTTOM\".");
        }
    }
}

module raised_letters() {
        metrics = textmetrics(
                text_string,
                size   = letter_height,
                font   = font_name,
                halign = "left",
                valign = "baseline"
                );
    text_width = metrics.size.x;

    translate([ 0, 0, base_height ])
        linear_extrude(height = letter_thickness){
            text(
                text_string,
                size   = letter_height,
                font   = font_name,
                halign = "left",
                valign = "baseline"
            );
             translate([text_width+emoji_x_offset,emoji_y_offset,0]) text(
                    emoji_text,
                    size   = emoji_size,
                    font   = emoji_font_name,
                    halign = "left",
                    valign = "baseline"
                );
        }
}

module name_topper() {
    color(base_color)    base_with_tunnel();
    color(letters_color) raised_letters();
}

name_topper();
