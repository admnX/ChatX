function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    const response = processUserInput(userInput);
    displayMessage('user', userInput);
    displayMessage('bot', response);
    document.getElementById('user-input').value = '';
  }
  
  function processUserInput(input) {
    const lowercaseInput = input.toLowerCase();
  
    if (lowercaseInput.includes('hello')) {
      return 'Hello! How can I assist you today?';
    } else if (lowercaseInput.includes('appointment')) {
      return 'To schedule an appointment, please visit our website and fill out the appointment form.';
    } else {
      return 'I\'m sorry, I didn\'t understand your request. Please try rephrasing it.';
    }
  }
  
  function displayMessage(sender, message) {
    const chatMessages = document.querySelector('.chat-messages');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.textContent = message;
    chatMessages.appendChild(messageElement);
  }
  
// Conversation state
let conversationState = {
  topic: null,
  language: null,
  userName: null,
  lastQuestion: null
};

const responses = {
  english: {
    greeting: [
      "Hello! How are you doing today?",
      "Hi there! What's on your mind?",
      "Hey! How's your day going?"
    ],
    weather: [
      "The weather's been quite interesting lately, hasn't it?",
      "I hope you're enjoying the weather today!",
      "Perfect day for a haircut, don't you think?"
    ],
    hobbies: [
      "Do you have any interesting hobbies?",
      "What do you like to do in your free time?",
      "I'm curious, what kind of activities do you enjoy?"
    ],
    music: [
      "What kind of music do you enjoy listening to?",
      "Got any favorite artists or bands?",
      "Music can really set the mood, don't you agree?"
    ],
    general: [
      "That's an interesting point. Can you tell me more about it?",
      "I see. What are your thoughts on that?",
      "Fascinating! How did you come to that conclusion?",
      "I'd love to hear more about your perspective on this."
    ]
  },
  dutch: {
    greeting: [
      "Hallo! Hoe gaat het met je vandaag?",
      "Hoi! Waar denk je aan?",
      "Hey! Hoe is je dag tot nu toe?"
    ],
    weather: [
      "Het weer is de laatste tijd behoorlijk interessant geweest, vind je niet?",
      "Ik hoop dat je vandaag van het weer geniet!",
      "Perfecte dag voor een knipbeurt, vind je ook niet?"
    ],
    hobbies: [
      "Heb je interessante hobby's?",
      "Wat doe je graag in je vrije tijd?",
      "Ik ben benieuwd, welke activiteiten vind je leuk om te doen?"
    ],
    music: [
      "Naar wat voor muziek luister je graag?",
      "Heb je favoriete artiesten of bands?",
      "Muziek kan echt de sfeer bepalen, ben je het daarmee eens?"
    ],
    general: [
      "Dat is een interessant punt. Kun je me er meer over vertellen?",
      "Ik begrijp het. Wat zijn jouw gedachten daarover?",
      "Fascinerend! Hoe ben je tot die conclusie gekomen?",
      "Ik zou graag meer horen over jouw perspectief hierop."
    ]
  }
};

function sendMessage() {
  const userInput = document.getElementById('user-input').value;
  const response = processUserInput(userInput);
  displayMessage('user', userInput);
  displayMessage('bot', response);
  document.getElementById('user-input').value = '';
}

function processUserInput(input) {
  const lowercaseInput = input.toLowerCase();
  conversationState.language = detectLanguage(lowercaseInput);
  if (!conversationState.userName) {
    conversationState.userName = extractName(lowercaseInput);
  }
  return generateResponse(lowercaseInput);
}

function detectLanguage(input) {
  const dutchKeywords = ['hallo', 'hoi', 'afspraak', 'openingstijden'];
  return dutchKeywords.some(keyword => input.includes(keyword)) ? 'dutch' : 'english';
}

function extractName(input) {
  const nameMatch = input.match(/my name is (\w+)/i) || input.match(/ik heet (\w+)/i);
  return nameMatch ? nameMatch[1] : null;
}

function generateResponse(input) {
  const newTopic = detectTopic(input);
  if (newTopic && newTopic !== conversationState.topic) {
    conversationState.topic = newTopic;
    return getResponseForTopic(newTopic) + ' ' + getFollowUpQuestion();
  }
  let response = getResponseForTopic(conversationState.topic || 'general');
  if (conversationState.userName) {
    response = personalizeResponse(response);
  }
  return response + ' ' + getFollowUpQuestion();
}

function detectTopic(input) {
  const topics = {
    greeting: ['hello', 'hi', 'hey', 'how are you', 'what\'s up'],
    weather: ['weather', 'sunny', 'rainy', 'cold', 'hot'],
    hobbies: ['hobby', 'free time', 'activities', 'interests'],
    music: ['music', 'song', 'artist', 'band', 'concert']
  };
  for (let [topic, keywords] of Object.entries(topics)) {
    if (keywords.some(keyword => input.includes(keyword))) {
      return topic;
    }
  }
  return 'general';
}

function getResponseForTopic(topic) {
  const topicResponses = responses[conversationState.language][topic];
  return topicResponses[Math.floor(Math.random() * topicResponses.length)];
}

function personalizeResponse(response) {
  return response.replace('you', `you, ${conversationState.userName}`);
}

function getFollowUpQuestion() {
  const followUps = {
    english: [
      "Is there anything else I can help you with?",
      "Do you have any other questions?",
      "What else would you like to know?"
    ],
    dutch: [
      "Is er nog iets anders waarmee ik u kan helpen?",
      "Heeft u nog andere vragen?",
      "Wat wilt u nog meer weten?"
    ]
  };
  return followUps[conversationState.language][Math.floor(Math.random() * followUps[conversationState.language].length)];
}

function displayMessage(sender, message) {
  const chatMessages = document.querySelector('.chat-messages');
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', sender);
  messageElement.textContent = message;
  chatMessages.appendChild(messageElement);
}

document.getElementById('user-input').addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
      sendMessage();
  }
});
