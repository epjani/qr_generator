const adjectives = [
  'brave', 'gentle', 'swift', 'calm', 'bright', 'bold', 'clever', 'eager',
  'fierce', 'happy', 'jolly', 'keen', 'lively', 'mighty', 'noble', 'proud',
  'quiet', 'rapid', 'steady', 'tender', 'vivid', 'warm', 'wise', 'young',
  'ancient', 'daring', 'elegant', 'fearless', 'graceful', 'humble', 'joyful',
  'kind', 'loyal', 'merry', 'nimble', 'patient', 'radiant', 'serene',
  'thrifty', 'unique', 'valiant', 'witty', 'zealous', 'agile', 'blissful',
  'cosmic', 'dreamy', 'epic', 'fancy', 'gleaming',
];

const colors = [
  'purple', 'silver', 'golden', 'crimson', 'azure', 'coral', 'emerald',
  'ivory', 'jade', 'lavender', 'maroon', 'navy', 'olive', 'pearl', 'ruby',
  'sapphire', 'teal', 'violet', 'amber', 'bronze', 'copper', 'indigo',
  'magenta', 'ochre', 'scarlet', 'turquoise', 'cobalt', 'slate', 'blush',
  'charcoal',
];

const nouns = [
  'elephant', 'mountain', 'river', 'phoenix', 'falcon', 'dolphin', 'tiger',
  'forest', 'canyon', 'ocean', 'dragon', 'sparrow', 'meadow', 'glacier',
  'harbor', 'island', 'jungle', 'kingdom', 'lantern', 'castle', 'nebula',
  'oracle', 'panther', 'quasar', 'rapids', 'summit', 'thunder', 'unicorn',
  'volcano', 'whisper', 'zenith', 'aurora', 'beacon', 'comet', 'desert',
  'eclipse', 'fjord', 'garden', 'horizon', 'inferno', 'jackal', 'kraken',
  'lagoon', 'mammoth', 'nomad', 'oasis', 'pilgrim', 'reef', 'storm',
  'tempest',
];

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateRandomPhrase(): string {
  return `${randomFrom(adjectives)} ${randomFrom(colors)} ${randomFrom(nouns)}`;
}

export function generateRandomUrl(): string {
  return `https://example.com/${randomFrom(nouns)}`;
}
