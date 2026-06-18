export const getSuggestions = async (req, res) => {

  console.log("===== getSuggestions called =====");
  console.log("Language:", req.query.language);

  try {

    const language = req.query.language || "English";

    let suggestions = [];

    if (language === "Hindi") {

      suggestions = [

        "आप कौन-कौन सी सेवाएँ प्रदान करते हैं?",
        "SEO के बारे में बताइए",

        "वेबसाइट डेवलपमेंट की जानकारी",
        "परफॉर्मेंस मार्केटिंग की जानकारी",

        "सोशल मीडिया सेवाएँ",
        "कॉर्पोरेट AV प्रोडक्शन",

        "मोबाइल ऐप डेवलपमेंट",
        "एक त्वरित ऑडिट प्राप्त करें",

        "आपका टेक स्टैक क्या है?",
        "संपर्क और कार्यालय का पता"

      ];

    } else {

      suggestions = [

        "What services do you offer?",
        "Tell me about SEO",

        "Website development details",
        "Performance marketing info",

        "Social media services",
        "Corporate AV production",

        "Mobile app development",
        "Get a quick audit",

        "What's your tech stack?",
        "Contact & office location"

      ];

    }

    return res.status(200).json({
      success: true,
      suggestions,
    });

  } catch (error) {

    console.log("Suggestion Error:", error);

    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });

  }

};