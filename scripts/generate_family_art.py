"""Generate family characters, play scenes and dance frames with Google Nano Banana 2.
Requires GEMINI_API_KEY and Pillow. Re-running skips finished assets; failures are
reported and never replaced with placeholders.
"""
import base64
import concurrent.futures
import io
import json
import os
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
MODEL = 'gemini-3.1-flash-image'
ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/' + MODEL + ':generateContent'
STYLE = 'cute polished watercolor storybook style with soft shading and clean silhouettes'
FAMILY = {
    'dad': 'Dad: a grown man with short parted brown hair, square glasses and a warm smile, wearing a mustard knitted cardigan, tan shirt and blue jeans',
    'mom': 'Mom: a grown woman with shoulder-length brown hair, round glasses and a gentle smile, wearing a sage green cardigan over a cream dress',
    'jeongan': 'Jeongan: a young child with a short chin-length brown bob, round glasses and a cheerful smile, wearing a sky blue hoodie and yellow shorts',
    'suan': 'Suan: a small, slim young child (the youngest and shortest in the family, a little shorter than her sibling Jeongan) of normal build with a slender, gently oval face, long brown hair past the shoulders, a happy closed-eye smile and NO glasses at all, wearing a coral pink sweater and denim overalls',
}
CATS = {
    'korean-shorthair': 'orange tabby cat with a purple star wizard hat',
    'persian': 'cream fluffy flat-faced Persian cat with a burgundy wide witch hat',
    'siamese': 'cream Siamese cat with dark points, blue eyes and a teal wizard hat',
    'maine-coon': 'large brown tabby Maine Coon with tufted ears and a navy floppy wizard hat',
    'russian-blue': 'blue-gray Russian Blue cat with green eyes and a violet crystal crown',
    'british-shorthair': 'stocky gray British Shorthair with amber eyes and a golden mushroom hat',
    'scottish-fold': 'gray Scottish Fold with folded ears and a plum knitted cap',
    'bengal': 'golden spotted Bengal cat with an emerald feather witch hat',
    'abyssinian': 'slender reddish Abyssinian cat with a ruby jester hat',
    'ragdoll': 'fluffy cream Ragdoll with dark points, blue eyes and a sky-blue moon hat',
    'norwegian-forest': 'fluffy brown Norwegian Forest cat with tufted ears and a forest-green witch hat',
    'sphynx': 'hairless pink Sphynx cat with big ears and a raspberry star witch hat',
    'munchkin': 'short-legged orange and white Munchkin cat with a turquoise mushroom hat',
    'turkish-angora': 'pure white long-haired Turkish Angora with an indigo crystal crown',
    'devon-rex': 'curly cream Devon Rex with very big ears and an orange jester hat',
    'american-shorthair': 'silver black-striped American Shorthair with a purple moon wizard hat',
}
PLAY_PANELS = [
    'waves a feather wand toy while the cat leaps to catch it',
    'sits reading a thick purple magic book with the cat curled on the lap',
    'kneels and offers a small bowl of cat treats while the cat sniffs happily',
    'plays peekaboo with the cat poking out of a cardboard box',
]
DANCE_FRAMES = [
    'both raise one arm and one paw high, starting the dance',
    'both spin with a twirl, coats and tail swishing',
    'both jump joyfully in the air with confetti flying',
    'both strike a happy final pose, arms out and paw out, with a rain of confetti',
]


def inline(path):
    return {'inline_data': {'mime_type': 'image/png', 'data': base64.b64encode(path.read_bytes()).decode()}}


def generate(parts, aspect, size):
    body = {'contents': [{'parts': parts}],
            'generationConfig': {'responseModalities': ['IMAGE'], 'imageConfig': {'aspectRatio': aspect, 'imageSize': size}}}
    request = urllib.request.Request(ENDPOINT, data=json.dumps(body).encode(),
                                     headers={'x-goog-api-key': os.environ['GEMINI_API_KEY'], 'Content-Type': 'application/json'})
    for attempt in range(5):
        try:
            with urllib.request.urlopen(request, timeout=300) as response:
                data = json.load(response)
            for part in data['candidates'][0]['content']['parts']:
                if 'inlineData' in part:
                    image = Image.open(io.BytesIO(base64.b64decode(part['inlineData']['data'])))
                    image.load()
                    return image.convert('RGB')
            raise ValueError('no image returned: ' + json.dumps(data)[:300])
        except (urllib.error.HTTPError, urllib.error.URLError, ValueError, KeyError) as error:
            if isinstance(error, urllib.error.HTTPError) and error.code in (400, 403):
                raise ValueError(error.read().decode()[:400])
            time.sleep(8 * (attempt + 1))
            last = error
    raise ValueError('generation failed after retries: ' + str(last))


def character(member):
    target = ROOT / 'assets/family' / (member + '.png')
    if target.exists():
        return 'Reused ' + target.name
    prompt = ('Image 1 is a simple hand-drawn face reference. Draw this same character as a full-body standing figure with a normal slim build, front view, friendly wave: '
              + FAMILY[member] + '. Keep the face exactly like the reference (same hair shape, glasses or no glasses, same smile) but paint everything in the '
              + STYLE + ' of image 2. Plain soft cream background, no text, whole body visible with margins.')
    parts = [inline(ROOT / 'assets/family/ref' / (member + '-face.png')), inline(ROOT / 'assets/cats/korean-shorthair.png')]
    if member == 'suan':
        parts.append(inline(ROOT / 'assets/family/jeongan.png'))
        prompt += ' Image 3 shows her sibling Jeongan at full height in the same canvas; draw Suan using the SAME canvas framing so that she stands slightly SHORTER than Jeongan, with a child-sized body and generous empty space above her head.'
    image = generate(parts + [{'text': prompt}], '3:4', '1K')
    image.thumbnail((768, 1024), Image.Resampling.LANCZOS)
    image.save(target, optimize=True)
    return 'Saved ' + target.name


def sheet(kind, member, cat):
    folder = ROOT / 'assets/family' / kind
    targets = [folder / '{}--{}-{}.webp'.format(member, cat, index + 1) for index in range(4)]
    if all(target.exists() for target in targets):
        return 'Reused {} {} {}'.format(kind, member, cat)
    who = FAMILY[member].split(':')[0]
    if kind == 'play':
        panels = PLAY_PANELS
        setting = 'warm cozy living-room scenes'
        lead = 'Each panel is a complete, separate scene of the SAME {} and the SAME cat playing together.'.format(who)
    else:
        panels = DANCE_FRAMES
        setting = 'the SAME festive party room with a disco ball, balloons and confetti in every panel, same camera angle, so the four panels read as consecutive animation frames of one dance'
        lead = 'The four panels are four consecutive frames of one joyful dance animation of the SAME {} and the SAME cat dancing together side by side.'.format(who)
    prompt = ('Image 1 is {} and image 2 is the cat: a {}. Create ONE square image divided into an exact 2x2 grid of four equal square panels separated by thin white gutters. {} '
              'Keep the cat\'s fur pattern, face and hat identical to image 2 and keep {}\'s face, eyes, hair, body build and clothes identical to image 1 (add glasses only if image 1 wears glasses). '
              'Panel 1 (top-left): {}. Panel 2 (top-right): {}. Panel 3 (bottom-left): {}. Panel 4 (bottom-right): {}. '
              '{}, {}, no text, no letters, no numbers.').format(FAMILY[member], CATS[cat], lead, who, panels[0], panels[1], panels[2], panels[3], setting, STYLE)
    image = generate([inline(ROOT / 'assets/family' / (member + '.png')), inline(ROOT / 'assets/cats' / (cat + '.png')), {'text': prompt}], '1:1', '2K')
    width, height = image.size
    half_w, half_h, gutter = width // 2, height // 2, int(width * 0.012)
    boxes = [(0, 0, half_w, half_h), (half_w, 0, width, half_h), (0, half_h, half_w, height), (half_w, half_h, width, height)]
    folder.mkdir(parents=True, exist_ok=True)
    for target, box in zip(targets, boxes):
        panel = image.crop((box[0] + gutter, box[1] + gutter, box[2] - gutter, box[3] - gutter))
        panel.thumbnail((720, 720), Image.Resampling.LANCZOS)
        panel.save(target, 'WEBP', quality=86, method=6)
    return 'Saved {} {} {}'.format(kind, member, cat)


def main():
    (ROOT / 'assets/family').mkdir(parents=True, exist_ok=True)
    for member in FAMILY:
        print(character(member), flush=True)
    jobs = [(kind, member, cat) for kind in ('play', 'dance') for member in FAMILY for cat in CATS]
    failures = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
        futures = {pool.submit(sheet, *job): job for job in jobs}
        for future in concurrent.futures.as_completed(futures):
            try:
                print(future.result(), flush=True)
            except Exception as error:
                failures.append(futures[future])
                print('FAILED', futures[future], str(error)[:300], flush=True)
    if failures:
        sys.exit('{} sheets failed; rerun to retry only the missing ones'.format(len(failures)))


if __name__ == '__main__':
    main()
