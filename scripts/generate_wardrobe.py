"""Generate Magic Cat wardrobe assets with the OpenAI image API.
Requires OPENAI_API_KEY and Pillow. --sample creates one fitted outfit;
--all generates missing catalog items and fitted outfits for all 16 cats.
Existing validated assets are reused; failures are reported, never substituted.
"""
import argparse
import base64
import concurrent.futures
import io
import json
import os
from pathlib import Path
import urllib.request
import uuid
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
CATS = 'korean-shorthair persian siamese maine-coon russian-blue british-shorthair scottish-fold bengal abyssinian ragdoll norwegian-forest sphynx munchkin turkish-angora devon-rex american-shorthair'.split()
OUTFITS = {
    'velvet-cape': 'a luxurious plum purple velvet wizard cape with softly draped fabric folds, gold embroidered tiny stars, a delicate gold clasp under the chin; cloak falls around the shoulders and sides, front paws and chest fur remain visible',
    'cloud-robe': 'a soft sky teal blue wizard robe with cream clouds embroidered along the hem, gently fitted around the real cat body, tiny sleeves fitted to upper front legs, paws exposed, soft ivory lining and a subtle gold seam',
    'sunny-sweater': 'a cozy honey yellow knitted cat sweater with realistic tiny knit stitches and ribbed neck and hem, softly fitted to the cat torso and upper front legs, paws exposed, a little cream sun design knitted on the chest',
    'forest-vest': 'a moss green linen waistcoat with tiny wooden buttons and cream stitching, open at the neck with chest fur visible, fitted naturally around the torso, bare front paws visible',
    'rose-dress': 'a soft dusty rose pink dress with a small gathered skirt and delicate ivory lace at the hem, modest simple fitted neckline, natural soft fabric folds around the torso, all paws visible',
    'ocean-sailor': 'an ivory and ocean blue sailor shirt with a square blue collar, fine blue stripes and tiny gold anchor embroidery, softly fitted sleeves ending above the front paws, no extra hat',
    'snow-coat': 'a pale ice blue winter coat with soft white fleece trim and a few tiny snowflake stitches, natural rounded warm cloth volume fitted around the body, no hood, paws and tail visible',
    'royal-robe': 'an elegant dark emerald royal robe with thin gold embroidered leaf edges and a soft ivory inner lining, rich natural draped fabric around the body, no crown or new hat, front paws visible',
    'night-cape': 'a midnight navy velvet cape with tiny silver constellation embroidery and a crescent clasp under the chin, flowing naturally over shoulders and down either side with chest fur and paws visible',
}
ITEMS = {
    'moon-milk': 'a tiny rounded glass bottle of cat milk with a lavender ribbon tied at its neck and a little crescent moon wax seal; no words or lettering',
    'tuna-tart': 'a small ceramic lavender feeding bowl containing appetizing little dried tuna cat treats, a few fish shaped treats beside the bowl',
    'star-biscuit': 'three little golden star-shaped cat treats arranged on a tiny cream ceramic saucer',
    'moon-medal': 'a wearable little gold crescent-moon medallion hanging at center of a thin curved gold necklace, front view of necklace around an invisible cat neck, ends curve backward, no other objects',
    'star-bow': 'a wearable luxurious rose pink silk cat bow tie with two gently curved loops and soft short tails, tiny gold star on the central knot, richly shaded fabric, straight front view',
    'bell-charm': 'a wearable turquoise braided cat collar, curved elliptically around an invisible cat neck, little polished gold round bell hanging centered in front, collar ends recede into distance, straight front view',
    'chicken-bites': 'a cream ceramic saucer of small plain cooked chicken treats, golden bite sized cubes, for a cat',
    'salmon-flakes': 'a small sea blue ceramic bowl holding pale pink cooked salmon flakes, cat safe treats',
    'turkey-rolls': 'three small soft plain cooked turkey meat rolls on an oval lavender saucer, cat treats',
    'beef-cubes': 'small soft brown cooked beef cubes in a tiny emerald green bowl, cat treats',
    'tuna-mousse': 'a little cream bowl with smooth light pink tuna mousse for cats, elegant little swirl',
    'crunchy-fish': 'a small porcelain saucer of golden fish shaped crunchy cat food biscuits, no packaging',
    'pearl-collar': 'a small wearable collar made of warm ivory pearls, shallow elliptical shape curved around an invisible cat neck, front visible half of the pearl necklace, no other objects',
    'leaf-brooch': 'one small polished gold and emerald leaf shaped fabric brooch, fine jewel vein detail, front view, no chain, no background',
    'heart-pendant': 'a little rose quartz heart pendant hanging from a thin gold cat necklace, shallow curved chain follows an invisible cat neck, pendant centered, front view',
    'round-glasses': 'a tiny pair of round thin antique gold wire eyeglass frames for a cat, completely empty transparent lens openings, straight front view, short side arms angled back, no face or mannequin',
    'star-hatpin': 'one small gold star shaped hat pin with a tiny purple gemstone center and one short silver feather beside it, front view, no hat, no head, no chain',
    'royal-gem': 'a beautiful small royal sapphire pendant framed in polished gold with tiny white diamonds, on a thin curved gold cat necklace, rich realistic jewel sparkle with tasteful scale, front view on invisible cat neck',
}
ITEMS.update({
    'velvet-cape': 'an EMPTY miniature plum velvet cape with gold embroidered stars and a gold clasp',
    'cloud-robe': 'an EMPTY miniature teal coat with embroidered cream clouds and ivory trim',
    'sunny-sweater': 'an EMPTY miniature honey yellow knitted sweater with a cream sun on its chest',
    'forest-vest': 'an EMPTY miniature moss green linen vest with small wooden buttons',
    'rose-dress': 'an EMPTY miniature dusty rose pink dress with an ivory lace hem',
    'ocean-sailor': 'an EMPTY miniature ivory and blue striped sailor shirt with an anchor design',
    'snow-coat': 'an EMPTY miniature ice blue coat with white fleece trim and snowflake stitches',
    'royal-robe': 'an EMPTY miniature emerald robe with gold leaf embroidery and ivory lining',
    'night-cape': 'an EMPTY miniature navy velvet cape with silver constellations and a moon clasp',
})


def request_image(prompt, source=None):
    fields = {'model': 'gpt-image-1', 'prompt': prompt, 'n': '1', 'size': '1024x1024', 'quality': 'medium', 'background': 'transparent', 'output_format': 'png'}
    headers = {'Authorization': 'Bearer ' + os.environ['OPENAI_API_KEY']}
    if source:
        boundary = uuid.uuid4().hex
        parts = []
        for name, value in fields.items():
            parts.append(('--' + boundary + '\r\nContent-Disposition: form-data; name="' + name + '"\r\n\r\n' + value + '\r\n').encode())
        parts.append(('--' + boundary + '\r\nContent-Disposition: form-data; name="image"; filename="cat.png"\r\nContent-Type: image/png\r\n\r\n').encode() + source.read_bytes() + b'\r\n')
        parts.append(('--' + boundary + '--\r\n').encode())
        body = b''.join(parts)
        headers['Content-Type'] = 'multipart/form-data; boundary=' + boundary
        endpoint = 'edits'
    else:
        fields['n'] = 1
        body = json.dumps(fields).encode()
        headers['Content-Type'] = 'application/json'
        endpoint = 'generations'
    req = urllib.request.Request('https://api.openai.com/v1/images/' + endpoint, data=body, headers=headers)
    with urllib.request.urlopen(req, timeout=180) as response:
        result = json.load(response)
    image = Image.open(io.BytesIO(base64.b64decode(result['data'][0]['b64_json'])))
    image.load()
    if image.mode != 'RGBA' or image.getchannel('A').getextrema()[0] != 0:
        raise ValueError('Image API did not return a transparent image')
    return image


def generate(job):
    cat_id, item_id = job
    target = ROOT / ('assets/cats/wardrobe/' + cat_id + '--' + item_id + '.png' if cat_id else 'assets/items/' + item_id + '.png')
    if target.exists():
        with Image.open(target) as existing:
            existing.verify()
        return 'Reused ' + str(target.relative_to(ROOT))
    if cat_id:
        prompt = ('Edit this exact provided cat sprite: dress ONLY its body in ' + OUTFITS[item_id] + '. Preserve the EXACT original cat breed, face, eyes, fur patterns, proportions, pose, original magical hat and hat colors. Do not replace the hat. Preserve identical image framing, cat placement and scale, keep full body visible. Clothing must naturally wrap around the cat anatomy, with soft folds, contact shadows and fur overlapping the neckline. No flat geometric shapes or sticker-like pasted clothes. Maintain original charming polished watercolor storybook illustration style. Transparent background, no ground, no extra objects or text.')
        image = request_image(prompt, ROOT / 'assets/cats' / (cat_id + '.png'))
        image.thumbnail((768, 768), Image.Resampling.LANCZOS)
    else:
        prompt = ('High-quality 2D watercolor storybook game inventory item: ' + ITEMS[item_id] + '. Cohesive warm painted style, delicate clean edges, detailed materials, soft highlights, three-dimensional volume, magical but tasteful. Exactly ONE item centered, isolated TRANSPARENT background, no cat, no people, no shadows on ground, no text or numbers. Generous transparent margins, entire item visible. Front view suitable to overlay on a front-facing cute cat.')
        image = request_image(prompt)
        image = image.crop(image.getchannel('A').getbbox())
        image.thumbnail((512, 512), Image.Resampling.LANCZOS)
    target.parent.mkdir(parents=True, exist_ok=True)
    image.save(target, optimize=True)
    return 'Saved ' + str(target.relative_to(ROOT))


def main():
    parser = argparse.ArgumentParser()
    modes = parser.add_mutually_exclusive_group(required=True)
    modes.add_argument('--sample', action='store_true')
    modes.add_argument('--all', action='store_true')
    args = parser.parse_args()
    jobs = [('korean-shorthair', 'velvet-cape')] if args.sample else [(None, item) for item in ITEMS] + [(cat, item) for cat in CATS for item in OUTFITS]
    failures = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
        futures = {pool.submit(generate, job): job for job in jobs}
        for future in concurrent.futures.as_completed(futures):
            try:
                print(future.result(), flush=True)
            except Exception as error:
                failures.append(futures[future])
                print('FAILED', futures[future], str(error), flush=True)
    if failures:
        raise SystemExit(str(len(failures)) + ' image generation jobs failed; rerun to retry only missing files')


if __name__ == '__main__':
    main()
