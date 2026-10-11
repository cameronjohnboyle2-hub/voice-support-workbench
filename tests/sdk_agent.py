import unittest
import asyncio
from support.agent import MapleDeskAgent

class SDKSmoke(unittest.TestCase):
    def test_agent_registers_only_read_policy_tool(self):
        agent = MapleDeskAgent()
        tools = agent.tools
        self.assertEqual(len(tools), 1)
        self.assertEqual(tools[0].info.name, 'approved_policy')

    def test_registered_tool_returns_grounded_policy(self):
        agent = MapleDeskAgent()
        result = asyncio.run(agent.approved_policy(context=None, topic='returns'))
        self.assertEqual(result['source'], 'fictional-policy/returns-v1')
        self.assertEqual(result['status'], 'answered')

