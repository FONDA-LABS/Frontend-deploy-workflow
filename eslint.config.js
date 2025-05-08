export default [
    {
        rules: {
            semi: "error",
            "prefer-const": "error",
            "spaced-comment": ["error", "always", {
                "line": {
                    "markers": ["/"],
                    "exceptions": ["-", "+"]
                },
                "block": {
                    "markers": ["!"],
                    "exceptions": ["*"],
                    "balanced": true
                }
            }]
        }
    }
]