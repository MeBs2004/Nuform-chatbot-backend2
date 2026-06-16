export const getSuggestions = async (req, res) => {

  try {

    const suggestions = [

      "What services do you offer?",
      "Tell me about SEO",

      "Website development details",
      "Performance marketing info",

      "Social media services",
      "Corporate AV pzroduction",

      "Mobile app development",
      "Get a quick audit",

      "What's your tech stack?",
      "Contact & office location"

    ];

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