"""Code-owned invented policies, shared by the optional SDK tool and tests."""

POLICIES = {
    'returns': {'answer': 'Unused Maple Desk accessories can be returned within 14 days in this fictional example.', 'source': 'fictional-policy/returns-v1'},
    'setup': {'answer': 'For the fictional Lamp One, connect its included cable, then hold the power button for two seconds.', 'source': 'fictional-policy/lamp-one-v1'},
}

def lookup_policy(topic: str) -> dict:
    if not isinstance(topic, str) or len(topic) > 80:
        return {'status': 'invalid', 'answer': 'Choose returns or setup.', 'source': None}
    policy = POLICIES.get(topic.strip().lower())
    if policy is None:
        return {'status': 'handoff', 'answer': 'This question needs a person to review it; no request has been sent.', 'source': None}
    return {'status': 'answered', **policy}
