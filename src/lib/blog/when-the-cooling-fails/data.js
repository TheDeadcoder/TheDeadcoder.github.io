// Evaluation runs are copied from the verbatim log in the training repository, and
// training numbers from the GRPO run report beside it. Every run starts from the
// same screen, so `run` numbers the five attempts in log order.

/** The six scenarios, by subsystem and difficulty (1 easy, 2 medium, 3 hard). */
export const scenarios = [
	{
		id: 'A1',
		system: 'cooling',
		level: 1,
		name: 'Cooling setpoint optimization',
		fault: 'Every cooling unit set to 15°C, wasting energy'
	},
	{
		id: 'A2',
		system: 'cooling',
		level: 2,
		name: 'Thermal event response',
		fault: 'CRAC-3 loses its compressor'
	},
	{
		id: 'A4',
		system: 'cooling',
		level: 3,
		name: 'CRAC failure cascade',
		fault: 'CRAC-1 loses its compressor and CRAC-3 its fan'
	},
	{
		id: 'B3',
		system: 'power',
		level: 1,
		name: 'Generator test protocol',
		fault: 'No fault: the monthly generator test'
	},
	{
		id: 'B1',
		system: 'power',
		level: 2,
		name: 'UPS alarm response',
		fault: 'UPS-1 briefly ran on battery'
	},
	{
		id: 'B4',
		system: 'power',
		level: 3,
		name: 'Power failure cascade',
		fault: 'Utility power lost, with a slow generator warm-up'
	}
];

/** The four GRPO reward functions: possible range, and mean over the whole training run. */
export const scores = [
	{
		name: 'Format',
		text: 'A reasoning block and exactly one known command',
		min: -1.5,
		max: 0.3,
		mean: 0.15
	},
	{
		name: 'Physics',
		text: 'Runs the command in a fresh copy of the simulator and scores how the facility’s health moves over the next steps',
		min: -4,
		max: 5,
		mean: 0.541
	},
	{
		name: 'Command rules',
		text: 'Hand-written for each scenario: diagnose the failed unit, leave broken units alone, never set below 17°C',
		min: -1.5,
		max: 1.2,
		mean: 0.653
	},
	{
		name: 'No repeats',
		text: 'A penalty for redoing a command from the scripted warm-up',
		min: -1,
		max: 0,
		mean: -0.019
	}
];

/** Every evaluation run: the ten commands sent, and the episode's total reward. */
export const runs = [
	{
		scenario: 'A4',
		model: 'base',
		run: 1,
		total: 0.033,
		commands: ['wait', 'wait', 'wait', 'wait', 'wait', 'wait', 'wait', 'diagnose PDU-A-01', 'wait', 'wait']
	},
	{
		scenario: 'A4',
		model: 'base',
		run: 2,
		total: 0.006,
		commands: ['wait', 'wait', 'wait', 'wait', 'wait', 'wait', 'set_rack_load A-01 5.5', 'wait', 'wait', 'wait']
	},
	{
		scenario: 'A4',
		model: 'base',
		run: 3,
		total: 0.018,
		commands: ['wait', 'wait', 'wait', 'wait', 'wait', 'wait', 'wait', 'wait', 'wait', 'wait']
	},
	{
		scenario: 'A4',
		model: 'base',
		run: 4,
		total: 0.048,
		commands: ['diagnose CRAC-1', 'wait', 'wait', 'wait', 'wait', 'wait', 'wait', 'wait', 'wait', 'diagnose PDU-A-01']
	},
	{
		scenario: 'A4',
		model: 'base',
		run: 5,
		total: 0.102,
		commands: ['diagnose CRAC-1', 'wait', 'wait', 'wait', 'wait', 'wait', 'wait', 'wait', 'wait', 'set_rack_load A-01 4.4']
	},
	{
		scenario: 'B4',
		model: 'base',
		run: 1,
		total: -0.128,
		commands: ['wait', 'wait', 'wait', 'wait', 'wait', 'diagnose PDU-A-01', 'wait', 'wait', 'wait', 'wait']
	},
	{
		scenario: 'B4',
		model: 'base',
		run: 2,
		total: -0.153,
		commands: ['wait', 'wait', 'wait', 'wait', 'wait', 'wait', 'wait', 'wait', 'wait', 'wait']
	},
	{
		scenario: 'B4',
		model: 'base',
		run: 3,
		total: -0.153,
		commands: ['wait', 'wait', 'wait', 'wait', 'wait', 'wait', 'wait', 'wait', 'wait', 'wait']
	},
	{
		scenario: 'B4',
		model: 'base',
		run: 4,
		total: -0.153,
		commands: ['wait', 'wait', 'wait', 'wait', 'wait', 'wait', 'wait', 'wait', 'wait', 'wait']
	},
	{
		scenario: 'B4',
		model: 'base',
		run: 5,
		total: -0.148,
		commands: ['start_generator', 'wait', 'wait', 'wait', 'wait', 'wait', 'wait', 'wait', 'wait', 'wait']
	},
	{
		scenario: 'A4',
		model: 'trained',
		run: 1,
		total: 0.448,
		commands: [
			'diagnose CRAC-1',
			'adjust_setpoint CRAC-2 22.0',
			'adjust_setpoint CRAC-4 22.0',
			'adjust_setpoint CRAC-4 22.0',
			'adjust_setpoint CRAC-4 22.0',
			'adjust_setpoint CRAC-4 22.0',
			'adjust_setpoint CRAC-4 28.0',
			'adjust_setpoint CRAC-2 28.0',
			'adjust_setpoint CRAC-4 27.1',
			'adjust_setpoint CRAC-2 27.1'
		]
	},
	{
		scenario: 'A4',
		model: 'trained',
		run: 2,
		total: 0.463,
		commands: [
			'diagnose CRAC-1',
			'adjust_setpoint CRAC-1 28.0',
			'adjust_setpoint CRAC-2 22.0',
			'adjust_setpoint CRAC-4 22.0',
			'adjust_setpoint CRAC-4 22.0',
			'adjust_setpoint CRAC-2 22.0',
			'adjust_setpoint CRAC-2 22.1',
			'adjust_setpoint CRAC-4 28.0',
			'adjust_setpoint CRAC-4 28',
			'adjust_setpoint CRAC-2 27.0'
		]
	},
	{
		scenario: 'A4',
		model: 'trained',
		run: 3,
		total: 0.451,
		commands: [
			'diagnose CRAC-1',
			'adjust_setpoint CRAC-2 22.0',
			'adjust_setpoint CRAC-4 22.0',
			'adjust_setpoint CRAC-2 22.0',
			'adjust_setpoint CRAC-4 22.0',
			'adjust_setpoint CRAC-2 20.0',
			'adjust_setpoint CRAC-4 28.0',
			'adjust_setpoint CRAC-4 20',
			'adjust_setpoint CRAC-4 18.0',
			'adjust_setpoint CRAC-2 18.0'
		]
	},
	{
		scenario: 'A4',
		model: 'trained',
		run: 4,
		total: 0.395,
		commands: [
			'diagnose CRAC-1',
			'adjust_setpoint CRAC-2 22.0',
			'adjust_setpoint CRAC-4 22.0',
			'adjust_setpoint CRAC-2 22.0',
			'adjust_setpoint CRAC-4 22.0',
			'adjust_setpoint CRAC-2 22',
			'adjust_setpoint CRAC-4 22.0',
			'adjust_setpoint CRAC-2 22.0',
			'adjust_setpoint CRAC-4 22.0',
			'adjust_setpoint CRAC-2 22.5'
		]
	},
	{
		scenario: 'A4',
		model: 'trained',
		run: 5,
		total: 0.394,
		commands: [
			'diagnose CRAC-1',
			'adjust_setpoint CRAC-2 22.0',
			'adjust_setpoint CRAC-4 22',
			'adjust_setpoint CRAC-4 22.0',
			'adjust_setpoint CRAC-4 22.0',
			'adjust_setpoint CRAC-4 22.0',
			'adjust_setpoint CRAC-4 22.0',
			'adjust_setpoint CRAC-2 22.0',
			'adjust_setpoint CRAC-4 20',
			'adjust_setpoint CRAC-4 22.0'
		]
	},
	{
		scenario: 'B4',
		model: 'trained',
		run: 1,
		total: -0.255,
		commands: [
			'start_generator',
			'start_generator',
			'set_rack_load A-01 10',
			'set_rack_load A-02 10.0',
			'set_rack_load A-03 11.0',
			'set_rack_load A-04 11.0',
			'set_rack_load A-05 11.0',
			'set_rack_load A-04 11.0',
			'set_rack_load A-05 11.0',
			'set_rack_load A-03 10.0'
		]
	},
	{
		scenario: 'B4',
		model: 'trained',
		run: 2,
		total: -0.388,
		commands: [
			'start_generator',
			'wait',
			'set_rack_load A-01 11',
			'set_rack_load A-02 11.0',
			'set_rack_load A-03 11.0',
			'set_rack_load A-4 11.0',
			'set_rack_load A-4 0.0',
			'set_rack_load A-4 8',
			'set_rack_load A-4 8.0',
			'set_rack_load A-4 11.0'
		]
	},
	{
		scenario: 'B4',
		model: 'trained',
		run: 3,
		total: -0.146,
		commands: [
			'start_generator',
			'start_generator',
			'set_rack_load A-01 0.0',
			'set_rack_load A-02 0',
			'set_rack_load A-03 00',
			'set_rack_load A-04 0.0',
			'set_rack_load A-05 01',
			'set_rack_load A-01 1.0',
			'set_rack_load A-0 1.0',
			'set_rack_load A-01 01'
		]
	},
	{
		scenario: 'B4',
		model: 'trained',
		run: 4,
		total: 0.54,
		commands: [
			'diagnose GEN-1',
			'start_generator',
			'set_rack_load A-01 10',
			'set_rack_load A-02 10.0',
			'set_rack_load A-03 11.0',
			'set_rack_load A-04 11.0',
			'set_rack_load A-05 11.0',
			'set_rack_load A-4 11.0',
			'set_rack_load A-3 11.0',
			'set_rack_load A-01 11.0'
		]
	},
	{
		scenario: 'B4',
		model: 'trained',
		run: 5,
		total: -0.211,
		commands: [
			'start_generator',
			'start_generator',
			'set_rack_load A-01 7.0',
			'set_rack_load A-02 7.0',
			'set_rack_load A-03 7.0',
			'set_rack_load A-04 7.0',
			'set_rack_load A-05 7.0',
			'set_rack_load A-06 7.0',
			'set_rack_load A-07 7.0',
			'set_rack_load A-8 7.0'
		]
	}
];

/** Rack names in the default facility: A-01 to A-10 and B-01 to B-10. */
const RACK = /^[AB]-(0[1-9]|10)$/;

/**
 * How the figures draw a command: its kind (which sets the color), the letter in its
 * cell, and whether the simulator rejected it. In these runs only rack commands that
 * named a rack that does not exist were rejected.
 * @param {string} command
 */
export function describe(command) {
	const [verb, target] = command.split(' ');
	if (verb === 'wait') return { kind: 'wait', letter: '', rejected: false };
	if (verb === 'diagnose') return { kind: 'diagnose', letter: 'D', rejected: false };
	if (verb === 'adjust_setpoint') return { kind: 'cooling', letter: 'S', rejected: false };
	if (verb === 'start_generator') return { kind: 'power', letter: 'G', rejected: false };
	return { kind: 'power', letter: 'L', rejected: !RACK.test(target) };
}
