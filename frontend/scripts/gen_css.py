#!/usr/bin/env python3

"""
This script generates a CSS file for Hub@Penn that overrides some default Bulma styles.

The file is imported after Bulma, so any CSS rules generated here will take priority.
"""

import io
import os

colors = {
    "is-primary": "#95001a",
    "is-link": "#82afd3",
    "is-info": "#01256e",
    "is-success": "#00b050",
    "is-warning": "#f2c100",
    "is-danger": "#ff0000",
}


class Color(object):
    """
    A color class for doing some simple color transformations and returning the hex value of a color.
    """

    def __init__(self, hex):
        hexstr = hex.strip("#")
        r, g, b = int(hexstr[:2], 16), int(hexstr[2:4], 16), int(hexstr[4:], 16)
        self.r = r
        self.g = g
        self.b = b

    def with_alpha(self, alpha):
        return f"rgba({self.r}, {self.g}, {self.b}, {alpha})"

    def scale(self, scale):
        self.r = int(self.r * scale)
        self.g = int(self.g * scale)
        self.b = int(self.b * scale)
        return self

    def hex(self):
        return f"#{self.r:02x}{self.g:02x}{self.b:02x}"


class CssWriter(object):
    """
    A writer that converts CSS selectors and rules into a stylesheet.
    """

    def __init__(self):
        self.rules = []

    def add_rule(self, selector, attributes):
        self.rules.append((selector, attributes))

    def get_value(self):
        ret = io.StringIO()
        ret.write(
            "/*\n * This file is automatically generated by a script.\n * Changes you make will be overwritten when the script is run.\n */\n\n"
        )
        for selector, attributes in self.rules:
            ret.write(f"{selector} {{\n")
            for key, value in attributes.items():
                ret.write(f"    {key}: {value};\n")
            ret.write("}\n\n")
        return ret.getvalue()


if __name__ == "__main__":
    script_dir = os.path.dirname(os.path.realpath(__file__))
    with open(
        os.path.join(script_dir, "../public/static/css/fyh.css"), "w", newline="\n"
    ) as f:
        writer = CssWriter()
        for name, color in colors.items():
            writer.add_rule(
                f".button.{name}, .button.{name}[disabled], .notification.{name}",
                {"background-color": color},
            )
            writer.add_rule(
                f".button.{name}:hover",
                {"background-color": Color(color).scale(0.9).hex()},
            )
            writer.add_rule(
                f".button.{name}:focus:not(:active)",
                {"box-shadow": f"0 0 0 0.125em {Color(color).with_alpha(0.25)}"},
            )

            text_name = "has-text-{}".format(name[3:])
            writer.add_rule(f".{text_name}", {"color": f"{color} !important"})

        writer.add_rule("a", {"color": "#256ADA"})
        writer.add_rule(".has-text-grey", {"color": f"#6E6E6E !important"})

        f.write(writer.get_value())
